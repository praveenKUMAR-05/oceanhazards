import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Briefcase, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();
    return (
        <section id="contact" className="py-24 bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        {t('ContactHeading', 'Get in Touch')}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg"
                    >
                        {t('ContactSubtext', "Have questions about OceanShield? We're here to help.")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Options */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-slate-700 transition-colors">
                            <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-blue-400">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t('ContactReqDemo', 'Request Demo')}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    {t('ContactReqDemoDesc', 'See how OceanShield fits your specific operational needs with a personalized guided tour.')}
                                </p>
                                <a href="#" className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center gap-1 transition-colors">
                                    {t('ContactScheduleBtn', 'Schedule Demo')} &rarr;
                                </a>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-slate-700 transition-colors">
                            <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-emerald-400">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t('ContactComm', 'Join Community')}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    {t('ContactCommDesc', 'Connect with other marine professionals, developers, and data scientists on our dedicated forum.')}
                                </p>
                                <a href="#" className="text-emerald-400 hover:text-emerald-300 font-medium text-sm flex items-center gap-1 transition-colors">
                                    {t('ContactJoinBtn', 'Join Discord')} &rarr;
                                </a>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-start gap-4 hover:border-slate-700 transition-colors">
                            <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 text-purple-400">
                                <Briefcase className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{t('ContactPartnership', 'Partnership Inquiry')}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-4">
                                    {t('ContactPartnerDesc', 'Interested in API access, hardware integration, or becoming a certified OceanShield authority node?')}
                                </p>
                                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium text-sm flex items-center gap-1 transition-colors">
                                    {t('ContactSalesBtn', 'Contact Sales')} &rarr;
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-8 relative overflow-hidden"
                    >
                        {/* Ambient Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />

                        <form className="relative z-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-400">{t('ContactFormName', 'Name')}</label>
                                    <input
                                        type="text"
                                        placeholder="Jane Doe"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-400">{t('ContactFormEmail', 'Email')}</label>
                                    <input
                                        type="email"
                                        placeholder="jane@company.com"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-400">{t('ContactFormType', 'Inquiry Type')}</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none outline-none">
                                    <option>{t('ContactSupport', 'General Support')}</option>
                                    <option>{t('ContactSales', 'Sales & Partnerships')}</option>
                                    <option>{t('ContactBug', 'Bug Report')}</option>
                                    <option>{t('ContactPress', 'Press Inquiry')}</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-400">{t('ContactFormMsg', 'Message')}</label>
                                <textarea
                                    rows="4"
                                    placeholder={t('ContactFormPlaceholder', 'How can we help you?')}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {t('ContactFormSubmit', 'Send Message')}
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
