import React from 'react';
import { motion } from 'framer-motion';
import { Users, Cpu, BellRing } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PlatformOverview = () => {
    const { t } = useTranslation();
    const workflowSteps = [
        {
            icon: <Users className="h-8 w-8 text-blue-400" />,
            title: t('PlatformCrowd', "Crowdsourced Reports"),
            description: t('PlatformCrowdDesc', "Users on vessels or shores submit real-time reports with images, GPS coordinates, and descriptions of observed marine hazards."),
            color: "from-blue-500/20 to-indigo-500/20",
            borderColor: "border-blue-500/30"
        },
        {
            icon: <Cpu className="h-8 w-8 text-purple-400" />,
            title: t('PlatformAI', "AI Hazard Verification"),
            description: t('PlatformAIDesc', "Our advanced Vision AI automatically analyzes uploaded images to verify hazards, distinguishing between debris, storms, and false positives."),
            color: "from-purple-500/20 to-fuchsia-500/20",
            borderColor: "border-purple-500/30"
        },
        {
            icon: <BellRing className="h-8 w-8 text-red-400" />,
            title: t('PlatformAlerts', "Automated Risk Alerts"),
            description: t('PlatformAlertsDesc', "Validated hazards combined with live weather data trigger automated spatial alerts to nearby vessels and coastal authorities."),
            color: "from-red-500/20 to-orange-500/20",
            borderColor: "border-red-500/30"
        }
    ];

    return (
        <section id="solutions" className="py-24 bg-slate-900 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                    >
                        {t('PlatformHow', 'How')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">OceanShield</span> {t('PlatformWorks', 'Works')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {t('PlatformSubtext', 'A seamless intelligence pipeline from observation to action.')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-500/20 via-purple-500/40 to-red-500/20 z-0" />

                    {workflowSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="relative z-10"
                        >
                            <div className={`
                bg-slate-800/80 backdrop-blur-xl border ${step.borderColor} p-8 rounded-2xl h-full
                hover:-translate-y-2 transition-transform duration-300
                shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group
              `}>
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10">
                                    <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-md shadow-black/20">
                                        {step.icon}
                                    </div>

                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-4xl font-black text-slate-700/50">0{index + 1}</span>
                                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                                    </div>

                                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PlatformOverview;
