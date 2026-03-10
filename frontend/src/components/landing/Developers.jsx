import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Developers = () => {
    const { t } = useTranslation();
    const developers = [
        {
            name: "Pranesha G",
            role: "Lead ",
            avatar: "PG",
            github: "#",
            linkedin: "#",
            color: "from-blue-500 to-indigo-500"
        },
        {
            name: "Praveen Kumar Mohan",
            role: "AI / ML Architect",
            avatar: "PKM",
            github: "#",
            linkedin: "#",
            color: "from-emerald-500 to-teal-500"
        },
        {
            name: "Partheev V",
            role: "Frontend Engineer",
            avatar: "PV",
            github: "#",
            linkedin: "#",
            color: "from-purple-500 to-fuchsia-500"
        },
        {
            name: "Ajay R",
            role: "AI Specialist",
            avatar: "AR",
            github: "#",
            linkedin: "#",
            color: "from-yellow-500 to-orange-500"
        },
        {
            name: "Pritika K R",
            role: "UI/UX Designer",
            avatar: "PKR",
            github: "#",
            linkedin: "#",
            color: "from-rose-500 to-pink-500"
        },
        {
            name: "Pradeep P J",
            role: "Backend Engineer",
            avatar: "PPJ",
            github: "#",
            linkedin: "#",
            color: "from-cyan-500 to-blue-500"
        }
    ];

    return (
        <section id="developers" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        {t('DevHeading', 'Meet the Builders')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {t('DevSubtext', 'The engineering team behind the OceanShield platform.')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {developers.map((dev, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300 shadow-lg"
                        >
                            <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${dev.color} flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-inner ring-4 ring-slate-800 group-hover:ring-slate-700 transition-all`}>
                                {dev.avatar}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">{dev.name}</h3>
                            <p className="text-sm text-blue-400 mb-6 font-medium">{dev.role}</p>

                            <div className="flex items-center justify-center gap-4">
                                <a href={dev.github} className="text-slate-500 hover:text-white transition-colors bg-slate-800 p-2 rounded-full">
                                    <Github className="w-4 h-4" />
                                </a>
                                <a href={dev.linkedin} className="text-slate-500 hover:text-blue-400 transition-colors bg-slate-800 p-2 rounded-full">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Developers;
