import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, FileText, AlertTriangle, ShieldCheck, Map } from "lucide-react";
import { useTranslation } from 'react-i18next';

const HazardStats = ({ reports, clusterCount = 0 }) => {
    const { t } = useTranslation();
    const getRiskLevel = (report) => {
        if (report.riskLevel) return report.riskLevel.toLowerCase();
        if (report.riskScore >= 70) return "high";
        if (report.riskScore >= 40) return "moderate";
        return "low";
    };

    const stats = {
        total: reports.length,
        high: reports.filter((r) => getRiskLevel(r) === "high").length,
        moderate: reports.filter((r) => getRiskLevel(r) === "moderate").length,
        low: reports.filter((r) => getRiskLevel(r) === "low").length,
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
        >
            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-white/10">
                <FileText className="w-6 h-6 text-blue-400 mb-1" />
                <span className="text-2xl font-bold text-white">{stats.total}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('StatsTotal', 'Total Reports')}</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-red-400/20 bg-red-400/5">
                <AlertCircle className="w-6 h-6 text-red-500 mb-1" />
                <span className="text-2xl font-bold text-red-400">{stats.high}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('StatsHigh', 'High Risk')}</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-orange-400/20 bg-orange-400/5">
                <AlertTriangle className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-2xl font-bold text-orange-400">{stats.moderate}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('StatsMod', 'Moderate')}</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-green-400/20 bg-green-400/5">
                <ShieldCheck className="w-6 h-6 text-green-500 mb-1" />
                <span className="text-2xl font-bold text-green-400">{stats.low}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('StatsLow', 'Low Risk')}</span>
            </div>

            <div className="glass-panel p-4 rounded-xl flex flex-col items-center justify-center text-center border-purple-400/20 bg-purple-400/5">
                <Map className="w-6 h-6 text-purple-500 mb-1" />
                <span className="text-2xl font-bold text-purple-400">{clusterCount}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{t('StatsClusters', 'Clusters')}</span>
            </div>
        </motion.div>
    );
};

export default HazardStats;
