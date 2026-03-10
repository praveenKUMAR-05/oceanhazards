import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Radar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CTA = () => {
    const { t } = useTranslation();
    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">

            {/* Background Graphic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950 pointer-events-none" />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-3xl p-10 md:p-16 text-center border border-indigo-400/30 shadow-[0_0_50px_rgba(37,99,235,0.3)] relative overflow-hidden"
                >
                    {/* Decorative Waves/Radar inside CTA */}
                    <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="0.5" />
                            <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="0.5" />
                            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="0.5" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <Radar className="w-16 h-16 text-blue-200 mx-auto mb-6 opacity-80" />

                        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                            {t('CTAHeading', 'Protect our oceans with intelligent hazard monitoring.')}
                        </h2>

                        <p className="text-blue-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                            {t('CTASubtext', 'Join thousands of early adopters using OceanShield to map, predict, and avoid marine threats in real-time.')}
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                            <Link
                                to="/register"
                                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-blue-700 font-bold hover:bg-slate-100 transition-colors shadow-xl flex items-center justify-center gap-2"
                            >
                                {t('CTAStart', 'Start Reporting')}
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                to="/dashboard"
                                className="w-full sm:w-auto px-8 py-4 rounded-full border border-blue-300/30 text-white font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                            >
                                {t('CTAExplore', 'Explore Dashboard')}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTA;
