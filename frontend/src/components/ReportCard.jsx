import React from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Calendar, Sparkles } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ReportCard = ({ report, index }) => {
    const { t } = useTranslation();

    const getRiskLevel = () => {
        if (report.riskLevel) return report.riskLevel;

        if (report.riskScore >= 70) return "High";
        if (report.riskScore >= 40) return "Moderate";
        return "Low";
    };

    const getRiskColor = (level) => {
        switch (level?.toLowerCase()) {
            case "high":
                return "text-red-400 bg-red-400/10 border-red-400/20";
            case "moderate":
                return "text-orange-400 bg-orange-400/10 border-orange-400/20";
            case "low":
                return "text-green-400 bg-green-400/10 border-green-400/20";
            default:
                return "text-gray-400 bg-gray-400/10 border-gray-400/20";
        }
    };

    const riskLevel = getRiskLevel();

    const imagePath = report.imageUrl || report.image;

    const imageSrc = imagePath
        ? imagePath.startsWith("http")
            ? imagePath
            : `http://localhost:5000${imagePath}`
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index ? index * 0.1 : 0 }}
            className="glass-panel p-4 rounded-xl flex gap-4 items-start hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Hazard"
                    className="w-24 h-24 object-cover rounded-lg border border-white/10 shrink-0"
                />
            ) : (
                <div className="w-24 h-24 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-8 h-8 text-gray-500" />
                </div>
            )}

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2 gap-2">
                    <div className="flex flex-col">
                        <h3 className="font-semibold text-white truncate text-lg">
                            {report.hazardType || t('CardHazardReport', 'Hazard Report')}
                        </h3>
                        {report.confidence > 0 && (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400 mt-0.5 uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" />
                                {t('CardAIDetected', 'AI Detected')} ({report.confidence.toFixed(0)}%)
                            </div>
                        )}
                    </div>

                    <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(
                            riskLevel
                        )}`}
                    >
                        {riskLevel} {t('CardRiskSuffix', 'Risk')}
                    </span>
                </div>

                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                    {report.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                            {report.location?.coordinates?.[1]?.toFixed(4)},{" "}
                            {report.location?.coordinates?.[0]?.toFixed(4)}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                            {report.createdAt
                                ? new Date(report.createdAt).toLocaleDateString()
                                : ""}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReportCard;