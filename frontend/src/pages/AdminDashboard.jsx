import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, AlertTriangle, Activity, Map as MapIcon,
    PieChart as PieChartIcon, BarChart3, Clock, AlertCircle, ShieldCheck, Database, Edit, Trash2, CheckCircle2
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    LineChart, Line
} from 'recharts';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import HazardAlert from '../components/HazardAlert';
import api from '../services/api';
import socket from '../services/socket';

const AdminDashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalReports: 0,
        highRiskReports: 0,
        moderateRiskReports: 0,
        lowRiskReports: 0,
        totalUsers: 0,
        clustersDetected: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('live'); // 'live', 'users', 'logs'

    const HAZARD_COLORS = ['#3b82f6', '#f59e0b', '#ef4444', '#10b981', '#8b5cf6'];
    const RISK_COLORS = {
        High: '#ef4444',
        Moderate: '#f59e0b',
        Low: '#10b981'
    };

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const [statsRes, activityRes, clustersRes, usersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/recent-activity').catch(() => ({ data: [] })), // fallback if route doesn't exist
                    api.get('/reports/clusters'),
                    api.get('/admin/users')
                ]);

                // The stats endpoint now returns 'recentReports', fallback to empty array if recentActivity fails natively
                setStats(statsRes.data);
                setRecentActivity(statsRes.data.recentReports || []);
                setClusters(clustersRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("Admin fetch error:", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate('/dashboard');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();

        socket.on("new-report", (report) => {
            setRecentActivity((prev) => [report, ...prev].slice(0, 50));
            setStats(prev => {
                const newStats = { ...prev, totalReports: prev.totalReports + 1 };
                const riskLevel = report.riskLevel?.toLowerCase() ||
                    (report.riskScore >= 70 ? 'high' : report.riskScore >= 40 ? 'moderate' : 'low');

                if (riskLevel === 'high') newStats.highRiskReports++;
                else if (riskLevel === 'moderate') newStats.moderateRiskReports++;
                else newStats.lowRiskReports++;

                return newStats;
            });
        });

        socket.on("cluster-update", (newClusters) => {
            setClusters(newClusters);
            setStats(prev => ({ ...prev, clustersDetected: newClusters.length }));
        });

        return () => {
            socket.off("new-report");
            socket.off("cluster-update");
        };
    }, [navigate]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.patch(`/admin/users/${userId}`, { role: newRole });
            setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
        } catch (error) {
            console.error("Failed to change user role", error);
        }
    };

    const removeClusterAlert = (indexToRemove) => {
        setClusters(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const hazardTypeCount = recentActivity.reduce((acc, curr) => {
        const t = curr.hazardType || 'Unknown';
        acc[t] = (acc[t] || 0) + 1;
        return acc;
    }, {});
    const pieData = Object.keys(hazardTypeCount).map(key => ({
        name: key, value: hazardTypeCount[key]
    }));

    const barData = [
        { name: 'Low', count: stats.lowRiskReports, fill: RISK_COLORS.Low },
        { name: 'Moderate', count: stats.moderateRiskReports, fill: RISK_COLORS.Moderate },
        { name: 'High', count: stats.highRiskReports, fill: RISK_COLORS.High },
    ];

    const datesCount = recentActivity.reduce((acc, curr) => {
        const d = new Date(curr.createdAt).toLocaleDateString();
        acc[d] = (acc[d] || 0) + 1;
        return acc;
    }, {});
    const lineData = Object.keys(datesCount).reverse().map(key => ({
        date: key, reports: datesCount[key]
    }));

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20 bg-[#0B1120]">
                <Navbar />
                <div className="text-xl text-blue-400 animate-pulse mt-8">{t('AdminLoading', 'Verifying Credentials & Loading Operations...')}</div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col text-white font-sans overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B1120] to-slate-900">
            <Navbar />

            <HazardAlert clusters={clusters} onClose={removeClusterAlert} />

            <div className="flex flex-1 min-h-0 overflow-hidden mt-16 pt-2">

                {/* Left Sidebar */}
                <aside className="w-64 bg-black/40 border-r border-white/10 hidden md:flex flex-col p-4 shadow-xl z-10 backdrop-blur-md">
                    <div className="flex justify-center items-center py-6 mb-4 border-b border-white/10">
                        <Database className="w-8 h-8 text-blue-500 mr-2" />
                        <h2 className="text-xl font-bold tracking-wider">{t('AdminAuthorityInfo', 'AUTHORITY')}</h2>
                    </div>

                    <nav className="flex-1 space-y-3">
                        <button
                            onClick={() => setActiveTab('live')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'live' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Activity className="w-5 h-5" />
                            <span className="font-semibold tracking-wide">{t('AdminLiveOps', 'Live Operations')}</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('users')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Users className="w-5 h-5" />
                            <span className="font-semibold tracking-wide">{t('AdminUserMan', 'User Management')}</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'logs' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <AlertCircle className="w-5 h-5" />
                            <span className="font-semibold tracking-wide">{t('AdminIncLogs', 'Incident Logs')}</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'live' && (
                            <motion.div
                                key="live"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-1">{t('AdminGlobalDash', 'Global Intelligence Dashboard')}</h1>
                                    <p className="text-gray-400 text-sm">{t('AdminGlobalDashDesc', 'Real-time crowdsourced hazards and validation pipelines.')}</p>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                                    <StatCard icon={Activity} label={t('AdminStatTotal', 'Total Reports')} value={stats.totalReports} color="text-blue-400" bg="bg-blue-400/10" border="border-blue-400/20" />
                                    <StatCard icon={AlertTriangle} label={t('AdminStatHigh', 'High Risk')} value={stats.highRiskReports} color="text-red-400" bg="bg-red-400/10" border="border-red-400/20" />
                                    <StatCard icon={AlertCircle} label={t('AdminStatMod', 'Moderate')} value={stats.moderateRiskReports} color="text-orange-400" bg="bg-orange-400/10" border="border-orange-400/20" />
                                    <StatCard icon={ShieldCheck} label={t('AdminStatLow', 'Low Risk')} value={stats.lowRiskReports} color="text-green-400" bg="bg-green-400/10" border="border-green-400/20" />
                                    <StatCard icon={MapIcon} label={t('AdminStatClusters', 'Clusters')} value={stats.clustersDetected} color="text-purple-400" bg="bg-purple-400/10" border="border-purple-400/20" />
                                    <StatCard icon={Users} label={t('AdminStatUsers', 'Active Users')} value={stats.totalUsers} color="text-pink-400" bg="bg-pink-400/10" border="border-pink-400/20" />
                                </div>

                                {/* Map & Charts */}
                                <div className="grid lg:grid-cols-3 gap-6">
                                    <div className="lg:col-span-2 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[450px]">
                                        <div className="bg-black/40 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                                <MapIcon className="w-5 h-5 text-blue-400" />
                                                {t('AdminLiveRadar', 'Live Hazard Radar')}
                                            </h3>
                                            <div className="flex gap-2 items-center">
                                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                                <span className="text-xs text-red-500 uppercase font-bold tracking-wide">{t('AdminLiveFeed', 'Live Feed')}</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-[calc(100%-53px)] relative z-0">
                                            <MapView reports={recentActivity} clusters={clusters} />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-6">
                                        <div className="glass-panel border border-white/10 rounded-2xl p-4 shadow-xl flex-1 flex flex-col justify-center min-h-[210px]">
                                            <h3 className="text-sm text-gray-400 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wider">
                                                <PieChartIcon className="w-4 h-4 text-blue-400" /> {t('AdminHazDist', 'Hazard Distribution')}
                                            </h3>
                                            <div className="flex-1 w-full h-[150px]">
                                                <ResponsiveContainer>
                                                    <PieChart>
                                                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={5} dataKey="value" stroke="none">
                                                            {pieData.map((e, i) => <Cell key={`cell-${i}`} fill={HAZARD_COLORS[i % HAZARD_COLORS.length]} />)}
                                                        </Pie>
                                                        <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                                    </PieChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                        <div className="glass-panel border border-white/10 rounded-2xl p-4 shadow-xl flex-1 flex flex-col justify-center min-h-[210px]">
                                            <h3 className="text-sm text-gray-400 font-semibold mb-2 flex items-center gap-2 uppercase tracking-wider">
                                                <BarChart3 className="w-4 h-4 text-orange-400" /> {t('AdminRiskSeg', 'Risk Segments')}
                                            </h3>
                                            <div className="flex-1 w-full h-[150px]">
                                                <ResponsiveContainer>
                                                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                                        <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                                        <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
                                                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                                                        <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-1">{t('AdminUserMod', 'User Moderation')}</h1>
                                    <p className="text-gray-400 text-sm">{t('AdminUserModDesc', 'Assign roles, suspend toxic users, and overview credibilities.')}</p>
                                </div>

                                <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm text-gray-300">
                                            <thead className="text-xs uppercase bg-black/40 text-gray-400 sticky top-0">
                                                <tr>
                                                    <th className="px-6 py-4">{t('AdminTblName', 'Name')}</th>
                                                    <th className="px-6 py-4">{t('AdminTblEmail', 'Email')}</th>
                                                    <th className="px-6 py-4">{t('AdminTblScore', 'Credibility Score')}</th>
                                                    <th className="px-6 py-4">{t('AdminTblRole', 'Role Matrix')}</th>
                                                    <th className="px-6 py-4 text-right">{t('AdminTblActions', 'Actions')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5 bg-black/20">
                                                {users.map(u => (
                                                    <tr key={u._id} className="hover:bg-white/5 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-white">{u.name}</td>
                                                        <td className="px-6 py-4 text-gray-400">{u.email}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full font-bold border border-blue-500/30">
                                                                {u.credibilityScore} pts
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider appearance-none cursor-pointer outline-none transition-colors border ${u.role === 'admin' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 hover:bg-purple-500/30' :
                                                                    u.role === 'suspended' ? 'bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30' :
                                                                        'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30'
                                                                    }`}
                                                            >
                                                                <option value="user" className="bg-slate-900 text-white font-sans">User</option>
                                                                <option value="admin" className="bg-slate-900 text-white font-sans">Admin</option>
                                                                <option value="suspended" className="bg-slate-900 text-white font-sans">Suspended</option>
                                                            </select>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button
                                                                onClick={() => handleRoleChange(u._id, u.role === 'suspended' ? 'user' : 'suspended')}
                                                                className="p-2 ml-auto text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                                                                title="Suspend User"
                                                            >
                                                                <AlertTriangle className="w-4 h-4" />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'logs' && (
                            <motion.div
                                key="logs"
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 50 }}
                                className="space-y-6 pb-20"
                            >
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-1">Global Incident Logs</h1>
                                    <p className="text-gray-400 text-sm">Review incoming reports globally across the verification engine.</p>
                                </div>

                                <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col max-h-[70vh]">
                                    <div className="bg-black/40 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                                        <h3 className="text-sm text-gray-400 font-semibold flex items-center gap-2 uppercase tracking-wider">
                                            <Clock className="w-4 h-4 text-orange-400" /> Recent Submission Feed
                                        </h3>
                                    </div>
                                    <div className="overflow-auto custom-scrollbar flex-1 bg-black/20">
                                        <table className="w-full text-left text-sm text-gray-300">
                                            <thead className="text-xs uppercase bg-black/40 text-gray-400 sticky top-0 backdrop-blur-md">
                                                <tr>
                                                    <th className="px-6 py-4">Threat Type</th>
                                                    <th className="px-6 py-4">Risk Level</th>
                                                    <th className="px-6 py-4">AI Vision Match</th>
                                                    <th className="px-6 py-4">Author</th>
                                                    <th className="px-6 py-4">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {recentActivity.map((log, i) => {
                                                    const riskLvl = log.riskLevel?.toLowerCase() || (log.riskScore >= 70 ? 'high' : log.riskScore >= 40 ? 'moderate' : 'low');

                                                    return (
                                                        <tr key={log._id || i} className="hover:bg-white/5 transition-colors cursor-pointer group">
                                                            <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                                                                {log.imageUrl && <img src={`http://localhost:5000${log.imageUrl}`} className="w-10 h-10 object-cover rounded shadow-md border border-white/10 group-hover:border-blue-400/50 transition-colors" />}
                                                                {log.hazardType || 'Unknown'}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${riskLvl === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                                                                    riskLvl === 'moderate' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                                        'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                    }`}>
                                                                    {riskLvl}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 font-medium text-blue-400">
                                                                {log.aiConfidence ? `${log.aiConfidence.toFixed(0)}% Match` : 'N/A'}
                                                            </td>
                                                            <td className="px-6 py-4 text-gray-400">{log.user?.name || log.user?.email || 'Anonymous'}</td>
                                                            <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                                                {new Date(log.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                        {recentActivity.length === 0 && <div className="text-center py-12 text-gray-500 font-medium tracking-wide border border-dashed border-white/5 rounded-xl m-4">No activity logged across network.</div>}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, color, bg, border }) => (
    <div className={`glass-panel p-4 rounded-2xl flex flex-col gap-1 border ${bg} border-t-2 border-t-white/20 shadow-lg relative overflow-hidden group`}>
        <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-20 bg-current ${color} group-hover:opacity-40 transition-opacity`}></div>
        <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-xl ${border} bg-black/40 backdrop-blur-md`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
        </div>
        <span className="text-2xl font-bold font-mono tracking-tight text-white">
            <CountUp end={value} duration={1.5} separator="," />
        </span>
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{label}</span>
    </div>
);

export default AdminDashboard;
