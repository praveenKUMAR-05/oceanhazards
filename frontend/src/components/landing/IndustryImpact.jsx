import React from 'react';
import { motion } from 'framer-motion';
import { Anchor, Home, Building2, Leaf, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IndustryImpact = () => {
    const { t } = useTranslation();
    const impacts = [
        {
            icon: <Anchor className="h-6 w-6 text-blue-400" />,
            title: t('ImpactFish', "Fishermen & Fleets"),
            description: t('ImpactFishDesc', "Avoid unseen hazards like ghost nets, submerged debris, or sudden squalls. Protect your vessel, catch, and crew with real-time route analysis."),
            bg: "bg-blue-500/10",
            border: "border-blue-500/20"
        },
        {
            icon: <Home className="h-6 w-6 text-emerald-400" />,
            title: t('ImpactCoast', "Coastal Communities"),
            description: t('ImpactCoastDesc', "Early warnings for approaching extreme weather, toxic blooms, or localized sea-level surges. Enhancing disaster preparedness."),
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20"
        },
        {
            icon: <Building2 className="h-6 w-6 text-indigo-400" />,
            title: t('ImpactGov', "Government Agencies"),
            description: t('ImpactGovDesc', "A centralized command view for coast guards and maritime enforcement to coordinate search and rescue or cleanup operations efficiently."),
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20"
        },
        {
            icon: <Leaf className="h-6 w-6 text-green-400" />,
            title: t('ImpactEnv', "Environmental Orgs"),
            description: t('ImpactEnvDesc', "Track the spread of oil spills, monitor illegal dumping zones, and gather long-term ecological data through crowdsourced intelligence."),
            bg: "bg-green-500/10",
            border: "border-green-500/20"
        },
        {
            icon: <Sun className="h-6 w-6 text-amber-400" />,
            title: t('ImpactTour', "Tourism Authorities"),
            description: t('ImpactTourDesc', "Ensure the safety of beaches and recreational waters by monitoring local water quality and rapidly responding to localized marine threats."),
            bg: "bg-amber-500/10",
            border: "border-amber-500/20"
        }
    ];

    return (
        <section className="py-24 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row justify-between mb-16 gap-8 items-center">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4 text-white"
                        >
                            {t('ImpactHeading', "Who Benefits from OceanShield?")}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-400 text-lg"
                        >
                            {t('ImpactSubtext', "Protecting lives, livelihoods, and ecosystems through shared intelligence.")}
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex-shrink-0"
                    >
                        <div className="flex -space-x-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`w-12 h-12 rounded-full border-2 border-slate-900 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold shadow-lg z-${40 - i * 10}`}>
                                    U{i + 1}
                                </div>
                            ))}
                            <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-xs font-bold shadow-lg z-0">
                                10k+
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 mt-2 text-center font-medium">{t('ActiveUsers', 'Active Users Worldwide')}</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {impacts.map((impact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-2xl border ${impact.border} ${impact.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}
                        >
                            <div className="bg-slate-900/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-slate-800">
                                {impact.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{impact.title}</h3>
                            <p className="text-slate-300 leading-relaxed text-sm">
                                {impact.description}
                            </p>
                        </motion.div>
                    ))}

                    {/* Join Us Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: impacts.length * 0.1 }}
                        className="p-6 rounded-2xl border border-slate-700 bg-slate-800/50 backdrop-blur-sm flex flex-col items-center justify-center text-center group hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{t('JoinNetwork', 'Join the Network')}</h3>
                        <p className="text-slate-400 text-sm">{t('JoinNetworkDesc', 'Contribute to a safer marine environment today.')}</p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default IndustryImpact;
