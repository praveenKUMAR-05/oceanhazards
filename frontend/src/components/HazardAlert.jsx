import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Activity } from "lucide-react";
import { useTranslation } from 'react-i18next';

const HazardAlert = ({ clusters, onClose }) => {
    const { t } = useTranslation();
    if (!clusters || clusters.length === 0) return null;

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[2000] flex flex-col gap-3 w-full max-w-md px-4 pointer-events-none">
            <AnimatePresence>
                {clusters.map((cluster, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="bg-red-500/20 border border-red-500/50 backdrop-blur-xl p-4 rounded-2xl shadow-2xl shadow-red-500/20 pointer-events-auto"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 border border-red-500/30">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>

                            <div className="flex-1">
                                <h3 className="text-red-400 font-bold text-lg mb-1 flex items-center justify-between">
                                    {t('AlertClusterDetected', 'Hazard Cluster Detected')}
                                    <button
                                        onClick={() => onClose && onClose(index)}
                                        className="text-white/50 hover:text-white transition-colors text-sm font-normal px-2"
                                    >
                                        {t('AlertDismiss', 'Dismiss')}
                                    </button>
                                </h3>

                                <div className="space-y-1 mt-2 text-sm text-gray-200">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-400/70" />
                                        <span>{t('AlertLocation', 'Location:')} {cluster.clusterCenter[0].toFixed(4)}, {cluster.clusterCenter[1].toFixed(4)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-red-400/70" />
                                        <span>{t('AlertReportsNearby', 'Reports nearby:')} <strong className="text-white">{cluster.reportCount}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400/70" />
                                        <span>{t('AlertAvgRisk', 'Average risk:')} <strong className="text-red-400">{cluster.averageRisk}</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default HazardAlert;
