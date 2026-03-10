import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const TechnologyStack = () => {
    const { t } = useTranslation();
    const techs = [
        {
            name: "React & Vite",
            description: t('TechReact', "Blazing fast UI rendering and hot module replacement for a seamless dashboard experience."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-cyan-400">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.0711 4.92893L4.92893 19.0711" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.0711 19.0711L4.92893 4.92893" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "Node.js & Express",
            description: t('TechNode', "Event-driven backend architecture handling thousands of real-time geospatial requests concurrently."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-green-500">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "MongoDB Spatial",
            description: t('TechMongo', "Advanced GeoJSON indexing for ultra-fast querying of hazards within complex bounding boxes."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-emerald-600">
                    <path d="M12 2C12 2 5 6.5 5 12C5 17.5 12 22 12 22C12 22 19 17.5 19 12C19 6.5 12 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L18.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 12L5.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "AI Vision Service",
            description: t('TechAI', "Custom-trained machine learning models processing image uploads to identify marine hazards with 94%+ accuracy."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-purple-500">
                    <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="12" r="1" fill="currentColor" />
                    <circle cx="15" cy="12" r="1" fill="currentColor" />
                </svg>
            )
        },
        {
            name: "Leaflet & Cluster Map",
            description: t('TechLeaflet', "High-performance interactive mapping rendering thousands of dynamic markers seamlessly on mobile and desktop."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-500">
                    <path d="M9 19L2 15L2 4L9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 20L9 19L9 8L15 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 16L15 20L15 9L22 5L22 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            name: "OpenWeather API",
            description: t('TechWeather', "Real-time meteorological telemetry integrated into the risk calculation engine to predict hazard movement."),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-amber-500">
                    <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1383 20.1805 10.2016 17.8596 10.0195C17.3807 6.64386 14.5126 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2319 4.01132 11.4611 4.0333 11.6871C2.30232 12.3529 1 14.0269 1 16C1 18.2091 2.79086 20 5 20H16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        }
    ];

    return (
        <section id="technology" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block border border-purple-500/30 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                    >
                        {t('TechTag', 'Engineering Excellence')}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        {t('TechHeading', 'Built with Advanced Technology')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {t('TechSubtext', 'A scalable, modern stack ensuring reliability when it matters most.')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {techs.map((tech, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/80 transition-colors flex flex-col items-center text-center"
                        >
                            <div className="mb-4 p-4 bg-slate-950 rounded-full border border-slate-800 shadow-inner">
                                {tech.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{tech.name}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                {tech.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TechnologyStack;
