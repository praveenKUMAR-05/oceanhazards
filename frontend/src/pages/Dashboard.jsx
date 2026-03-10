import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import ReportForm from '../components/ReportForm';
import ReportCard from '../components/ReportCard';
import HazardStats from '../components/HazardStats';
import HazardAlert from '../components/HazardAlert';
import api from '../services/api';
import socket from '../services/socket';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [reports, setReports] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [clickedCoordinates, setClickedCoordinates] = useState(null);
    const reportsRef = useRef(reports);

    useEffect(() => {
        reportsRef.current = reports;
    }, [reports]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchReports();
        }

        // Socket listener for new reports
        socket.on("new-report", (report) => {
            // Determine deduplication outside of the state updater
            const isDuplicate = reportsRef.current.find(r => r._id === report._id);

            if (!isDuplicate) {
                toast.success(`${t('DashNewHazard', 'New hazard:')} ${report.hazardType || t('DashUnknown', 'Unknown')}`, {
                    icon: '🚨'
                });
            }

            setReports((prev) => {
                // Deduplicate if already added via local submission
                if (prev.find(r => r._id === report._id)) return prev;
                return [report, ...prev];
            });
        });

        // Socket listener for new cluster updates
        socket.on("cluster-update", (newClusters) => {
            setClusters(newClusters);
        });

        // Cleanup listener on unmount
        return () => {
            socket.off("new-report");
            socket.off("cluster-update");
        };
    }, [navigate]);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const res = await api.get('/reports');
            setReports(res.data.data || res.data);

            // Also fetch clusters
            const clusterRes = await api.get('/reports/clusters');
            setClusters(clusterRes.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setError(t('DashFetchError', 'Failed to fetch reports.'));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReportAdded = (newReportData) => {
        const newReport = newReportData.data || newReportData;
        setReports((prev) => {
            if (prev.find(r => r._id === newReport._id)) return prev;
            return [newReport, ...prev];
        });
        setClickedCoordinates(null);
        // Clusters will be automatically refreshed via socket "cluster-update"
    };

    const removeClusterAlert = (indexToRemove) => {
        setClusters(prev => prev.filter((_, idx) => idx !== indexToRemove));
    };

    const handleMapClick = (latlng) => {
        setClickedCoordinates(latlng);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-20">
                <Navbar />
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">

            {/* Navbar naturally takes its space at the top */}
            <Navbar />

            {/* Main Dashboard Content - takes remaining height */}
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-12 gap-8 min-h-0 overflow-y-auto lg:overflow-hidden">

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-8 min-h-[400px] lg:min-h-0 lg:h-full relative overflow-hidden rounded-xl"
                >
                    <HazardAlert clusters={clusters} onClose={removeClusterAlert} />
                    <MapView reports={reports} clusters={clusters} onMapClick={handleMapClick} />
                </motion.div>

                {/* Right Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-4 flex flex-col gap-6 lg:h-full lg:overflow-y-auto pb-8 pr-2 custom-scrollbar"
                >

                    {error && (
                        <div className="bg-red-500/10 text-red-400 p-4 rounded-xl border border-red-500/20 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <ReportForm
                        onReportAdded={handleReportAdded}
                        clickedCoordinates={clickedCoordinates}
                    />

                    <HazardStats reports={reports} clusterCount={clusters.length} />

                    <div className="flex flex-col gap-4">
                        <h3 className="font-semibold text-white/90 px-1">
                            {t('DashRecentReports', 'Recent Reports')}
                        </h3>

                        {reports.length === 0 ? (
                            <div className="text-gray-400 text-sm p-4 text-center border border-dashed border-white/10 rounded-xl">
                                {t('DashNoReports', 'No reports submitted yet.')}
                            </div>
                        ) : (
                            reports.map((report, idx) => (
                                <ReportCard
                                    key={report._id}
                                    report={report}
                                    index={idx}
                                />
                            ))
                        )}
                    </div>

                </motion.div>

            </main>

        </div>
    );
};

export default Dashboard;