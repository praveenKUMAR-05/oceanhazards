import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Map, LineChart, CloudOff, Target, ShieldCheck, Activity, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const KeyFeatures = () => {
    const { t } = useTranslation();
    const features = [
        {
            icon: <Brain className="h-6 w-6 text-indigo-400" />,
            title: t('FeatureAI', "AI Hazard Detection"),
            description: t('FeatureAIDesc', "Advanced image classification trained on thousands of marine anomalies to verify user reports in seconds.")
        },
        {
            icon: <Map className="h-6 w-6 text-emerald-400" />,
            title: t('FeatureMap', "Real-Time Hazard Map"),
            description: t('FeatureMapDesc', "Interactive, live-updating spatial visualization of verified marine risks, protected zones, and safe routes.")
        },
        {
            icon: <LineChart className="h-6 w-6 text-blue-400" />,
            title: t('FeaturePredict', "Risk Prediction Engine"),
            description: t('FeaturePredictDesc', "Machine learning algorithms combining historical data with current trends to forecast emerging danger zones.")
        },
        {
            icon: <CloudOff className="h-6 w-6 text-cyan-400" />,
            title: t('FeatureWeather', "Weather Integration"),
            description: t('FeatureWeatherDesc', "Live synchronization with global meteorological APIs to factor wind, swell, and storm data into risk scores.")
        },
        {
            icon: <Target className="h-6 w-6 text-purple-400" />,
            title: t('FeatureCluster', "Geospatial Clustering"),
            description: t('FeatureClusterDesc', "Automated grouping of proximal incidents to identify massive hazard events like oil spills or debris fields.")
        },
        {
            icon: <Activity className="h-6 w-6 text-red-400" />,
            title: t('FeatureAlert', "Automated Alerts"),
            description: t('FeatureAlertDesc', "Instant push notifications and SMS alerts dispatched to vessels approaching verified high-risk coordinates.")
        },
        {
            icon: <Users className="h-6 w-6 text-amber-400" />,
            title: t('FeatureScore', "Credibility Scoring"),
            description: t('FeatureScoreDesc', "Dynamic trust matrix adjusting user report weight based on their historical accuracy and AI validation rates.")
        },
        {
            icon: <ShieldCheck className="h-6 w-6 text-rose-400" />,
            title: t('FeatureDash', "Authority Dashboard"),
            description: t('FeatureDashDesc', "Dedicated command center for coastal guards and environmental agencies to dispatch recovery units.")
        }
    ];

    return (
        <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-blue-500 font-semibold tracking-wide uppercase text-sm mb-3"
                        >
                            {t('FeaturesTag', 'Platform Capabilities')}
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-bold text-white mb-4"
                        >
                            {t('FeaturesHeading', 'Core Platform Features')}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 text-lg"
                        >
                            {t('FeaturesSubtext', 'Everything you need to monitor, verify, and respond to marine hazards.')}
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="group bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Hover gradient effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10">
                                <div className="bg-slate-800/80 w-12 h-12 rounded-lg flex items-center justify-center mb-5 shadow-inner border border-slate-700/50 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>

                                <h3 className="text-lg font-bold text-slate-100 mb-2">{feature.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default KeyFeatures;
