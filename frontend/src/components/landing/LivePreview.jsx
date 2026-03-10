import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Zap, Navigation, AlertTriangle, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LivePreview = () => {
    const { t } = useTranslation();
    return (
        <section className="py-24 bg-slate-900 border-y border-slate-800 relative overflow-hidden">

            {/* Glow Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-slate-400"
                    >
                        {t('PreviewHeading', 'Experience Live Intelligence')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {t('PreviewSubtext', 'A powerful, interactive dashboard built for speed, accuracy, and clarity.')}
                    </motion.p>
                </div>

                {/* Dashboard Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9] max-h-[700px] flex flex-col"
                >
                    {/* Fake Browser Title Bar */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 border-b border-slate-800">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex-1 text-center">
                            <div className="inline-block bg-slate-800 rounded-md px-3 py-1 text-xs text-slate-400 font-mono shadow-inner border border-slate-700">
                                app.oceanshield.live/dashboard
                            </div>
                        </div>
                    </div>

                    {/* Fake Dashboard Content */}
                    <div className="flex-1 flex flex-col md:flex-row relative">

                        {/* Sidebar */}
                        <div className="hidden md:flex w-64 bg-slate-900/50 border-r border-slate-800 flex-col p-4 gap-2">
                            <div className="flex items-center gap-3 px-3 py-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                                <Navigation className="h-5 w-5" /> <span className="font-semibold text-sm">{t('PreviewLiveMap', 'Live Map')}</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer">
                                <LineChart className="h-5 w-5" /> <span className="font-medium text-sm">{t('PreviewAnalytics', 'Analytics')}</span>
                            </div>
                            <div className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer">
                                <Zap className="h-5 w-5" /> <span className="font-medium text-sm">{t('PreviewAlerts', 'Active Alerts')}</span>
                                <span className="ml-auto bg-red-500/20 text-red-400 text-xs py-0.5 px-2 rounded-full border border-red-500/30">3</span>
                            </div>

                            <div className="mt-auto space-y-4">
                                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                                    <div className="text-xs text-slate-400 mb-1">{t('PreviewStatus', 'System Status')}</div>
                                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                        {t('PreviewAIOnline', 'AI Model: Online')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Area Simulation */}
                        <div className="flex-1 bg-slate-950 relative overflow-hidden">
                            {/* Map Grid */}
                            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

                            {/* Simulated Coastline (SVG Path) */}
                            <svg className="absolute -left-10 md:left-20 top-0 w-full h-full opacity-20 pointer-events-none stroke-blue-500" fill="none" viewBox="0 0 800 600" preserveAspectRatio="none">
                                <path d="M0,0 L100,50 C150,80 200,30 250,100 C300,170 280,250 350,300 C420,350 500,320 600,400 C700,480 750,550 800,600" strokeWidth="2" strokeDasharray="5,5" />
                            </svg>

                            {/* Map Pins / Hazard markers */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                            >
                                <div className="w-2 h-2 bg-red-400 rounded-full" />
                            </motion.div>

                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                                className="absolute top-1/2 right-1/4 w-12 h-12 bg-orange-500/20 border border-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(249,115,22,0.4)]"
                            >
                                <div className="w-3 h-3 bg-orange-400 rounded-full" />
                            </motion.div>

                            {/* Floating Dashboard Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute top-4 right-4 w-64 bg-slate-900/90 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 shadow-xl pointer-events-none"
                            >
                                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
                                    <span className="text-sm font-semibold text-slate-300">{t('PreviewStats', 'Live Statistics')}</span>
                                    <LineChart className="h-4 w-4 text-blue-400" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <span className="text-xs text-slate-400">{t('PreviewTotalReports', 'Total Reports')}</span>
                                        <span className="text-lg font-bold text-white">1,248</span>
                                    </div>
                                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                                        <div className="bg-blue-500 h-1.5 rounded-full w-[70%]" />
                                    </div>

                                    <div className="pt-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs text-slate-400">{t('PreviewAIVerified', 'AI Verified (94%)')}</span>
                                            <span className="text-sm font-bold text-emerald-400">1,173</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Alert Notification */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-4 left-4 md:left-auto md:right-4 bg-red-500/10 border border-red-500/30 backdrop-blur-md rounded-xl p-3 shadow-lg flex items-start gap-3 pointer-events-none max-w-sm"
                            >
                                <div className="bg-red-500/20 p-2 rounded-lg">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-red-500">{t('PreviewCriticalHazard', 'Critical Hazard Alert')}</h4>
                                    <p className="text-xs text-red-300 mt-0.5">{t('PreviewCriticalDesc', 'Large debris field detected near shipping lane A4. AI Confidence: 98%.')}</p>
                                </div>
                            </motion.div>

                            {/* Verification Popup */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.5 }}
                                className="hidden md:flex absolute top-1/4 left-1/4 translate-x-12 translate-y-4 bg-slate-800/95 border border-slate-700 rounded-lg p-3 shadow-2xl items-center gap-2 pointer-events-none"
                            >
                                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                <div>
                                    <div className="text-xs font-bold text-white">{t('PreviewImgVerified', 'Image Verified')}</div>
                                    <div className="text-[10px] text-slate-400">{t('PreviewGhostNet', 'Ghost Net (Severity: Medium)')}</div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LivePreview;
