import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, ShieldAlert, Waves, Satellite } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

            {/* Background Animated Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[120px]" />
                <div className="absolute top-[20%] -right-[20%] w-[60%] h-[80%] rounded-full bg-indigo-900/20 blur-[120px]" />

                {/* Animated grid */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
                    style={{ backgroundSize: '4rem 4rem', maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-4xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        {t('HeroBadge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
                    >
                        {t('HeroTitle1')} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">
                            {t('HeroTitle2')}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('HeroDescription')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                        >
                            {t('GetStarted')}
                            <ArrowRight className="h-4 w-4" />
                        </a>

                        <a
                            href="#features"
                            className="w-full sm:w-auto px-8 py-3 rounded-full bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 text-white font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                        >
                            <Play className="h-4 w-4" />
                            {t('ViewDemo')}
                        </a>
                    </motion.div>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 relative mx-auto max-w-5xl"
                >
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 blur-xl" />
                    <div className="relative rounded-2xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden p-2">

                        {/* Mock Window Header */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            <div className="ml-4 text-xs text-slate-500 font-mono">oceanshield-dashboard - admin</div>
                        </div>

                        {/* Mock Dashboard Content */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 aspect-[16/9] md:aspect-[21/9]">
                            {/* Sidebar Mock */}
                            <div className="hidden md:flex flex-col gap-2 rounded-xl bg-slate-800/50 p-4">
                                <div className="h-8 w-full bg-slate-700/50 rounded-md animate-pulse" />
                                <div className="h-8 w-full bg-slate-700/30 rounded-md mt-4" />
                                <div className="h-8 w-full bg-slate-700/30 rounded-md" />
                                <div className="h-8 w-full bg-slate-700/30 rounded-md" />
                            </div>

                            {/* Main Area Mock */}
                            <div className="col-span-1 md:col-span-3 rounded-xl bg-slate-950 p-4 relative overflow-hidden border border-slate-800/50">

                                {/* Map grid simulation */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />

                                {/* Mock UI Elements Floating */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                    className="absolute top-8 left-8 p-3 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-lg flex items-center gap-3"
                                >
                                    <ShieldAlert className="text-red-400 h-6 w-6" />
                                    <div>
                                        <div className="text-xs text-slate-400">High Risk Detected</div>
                                        <div className="text-sm font-bold text-white">Cyclone Approaching</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-8 right-8 p-3 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-md shadow-lg flex items-center gap-3"
                                >
                                    <Satellite className="text-blue-400 h-6 w-6" />
                                    <div>
                                        <div className="text-xs text-slate-400">Satellite Sync</div>
                                        <div className="text-sm font-bold text-white">Active (24ms)</div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 rounded-full border-2 border-red-500/50 bg-red-500/20" />
                                </motion.div>

                            </div>
                        </div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
