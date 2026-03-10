import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Shield, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [activePopup, setActivePopup] = useState(null);

  const handleOpen = (type) => {
    setActivePopup(type);
  };

  const handleClose = () => {
    setActivePopup(null);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-16">

          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">
                OceanShield
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              {t(
                'FooterSubtext',
                'Real-time crowdsourced hazard monitoring, AI validation, and automated alerts for safer oceans.'
              )}
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/pulginmindsoceanshield-crypto"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/oceanshield-pulgin"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/MindsPulgi16172"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-sky-400 hover:border-sky-500/50 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">
              {t('FooterCompany', 'Company')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('about');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterAbout', 'About Us')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('careers');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterCareers', 'Careers')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('blog');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterBlog', 'Blog')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('press');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterPress', 'Press Kit')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">
              {t('FooterProduct', 'Product')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('features');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterFeatures', 'Features')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('security');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterSecurity', 'Security')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('api');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterAPI', 'API Access')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('pricing');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterPricing', 'Pricing')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">
              {t('FooterResources', 'Resources')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('docs');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterDocs', 'Documentation')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('support');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterSupport', 'Support Center')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('community');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterForum', 'Community Forum')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpen('policies');
                  }}
                  className="text-slate-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {t('FooterPolicy', 'Ocean Data Policies')}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-white font-semibold mb-6">
              {t('FooterStayUpdated', 'Stay Updated')}
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              {t(
                'FooterNewsletter',
                'Subscribe to our newsletter for the latest safety alerts, features, and research updates.'
              )}
            </p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('FooterEmailPlaceholder', 'Email address')}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-500 transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} OceanShield Technologies Inc. {t('FooterRights', 'All rights reserved.')}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              {t('FooterPrivacy', 'Privacy Policy')}
            </a>
            <a
              href="#contact"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              {t('FooterTerms', 'Terms of Service')}
            </a>
            <a
              href="#contact"
              className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
            >
              {t('FooterCookies', 'Cookie settings')}
            </a>
          </div>
        </div>

        {/* Popup modal for footer links with animation */}
        <AnimatePresence>
          {activePopup && (
            <motion.div
              className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full mx-4 mb-8 p-6 shadow-2xl relative"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>

                {activePopup === 'about' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      About OceanShield
                    </h2>
                    <p className="text-slate-300 mb-3">
                      OceanShield is a platform dedicated to making coastal communities safer
                      through real-time ocean hazard monitoring.
                    </p>
                    <p className="text-slate-300 mb-3">
                      We combine crowdsourced reports, sensor data, and AI models to deliver
                      timely, trustworthy alerts to citizens, lifeguards, and authorities.
                    </p>
                    <p className="text-slate-300">
                      Our mission is to turn complex ocean data into clear, actionable
                      information that helps protect lives and livelihoods.
                    </p>
                  </>
                )}

                {activePopup === 'careers' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Careers at OceanShield
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Join a mission-driven team working at the intersection of ocean science,
                      AI, and public safety.
                    </p>
                    <p className="text-slate-300 mb-3">
                      We&apos;re looking for engineers, researchers, and designers who want
                      their work to have real-world impact in climate resilience and coastal safety.
                    </p>
                    <p className="text-slate-300">
                      We will soon publish open roles here. In the meantime, you can reach us at
                      <span className="font-medium text-blue-400"> careers@oceanshield.com</span>.
                    </p>
                  </>
                )}

                {activePopup === 'blog' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      OceanShield Blog
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Stories, product updates, and insights from the OceanShield team.
                    </p>
                    <p className="text-slate-300 mb-3">
                      We share learnings from real-world deployments, new features, and
                      research on ocean safety and climate risk.
                    </p>
                    <p className="text-slate-300">
                      Follow along as we improve how coastal communities understand and respond
                      to ocean hazards.
                    </p>
                  </>
                )}

                {activePopup === 'press' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Press Kit
                    </h2>
                    <p className="text-slate-300 mb-3">
                      This overview is for journalists, partners, and event organizers who
                      want to feature OceanShield.
                    </p>
                    <p className="text-slate-300 mb-3">
                      It includes our mission, product highlights, and example use cases for
                      emergency services, coastal cities, and research partners.
                    </p>
                    <p className="text-slate-300">
                      For media inquiries, reach us at
                      <span className="font-medium text-blue-400"> press@oceanshield.com</span>.
                    </p>
                  </>
                )}

                {activePopup === 'features' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Key Features
                    </h2>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                      <li>Real-time ocean hazard reporting from citizens and authorities.</li>
                      <li>AI validation layer to reduce false alarms and highlight critical risks.</li>
                      <li>Interactive coastal maps with live alerts and risk levels.</li>
                      <li>Configurable notifications for beaches, ports, and specific regions.</li>
                    </ul>
                  </>
                )}

                {activePopup === 'security' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Security
                    </h2>
                    <p className="text-slate-300 mb-3">
                      We protect account data and hazard information with industry best practices.
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                      <li>Encrypted connections (HTTPS) for all traffic.</li>
                      <li>Role-based access controls for sensitive dashboards.</li>
                      <li>Audit-friendly logging for administrative actions.</li>
                    </ul>
                  </>
                )}

                {activePopup === 'api' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      API Access
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Integrate OceanShield data into your own tools and dashboards.
                    </p>
                    <p className="text-slate-300 mb-3">
                      Our API provides programmatic access to hazard reports, risk levels,
                      and alert history for approved partners.
                    </p>
                    <p className="text-slate-300">
                      Ideal for city dashboards, emergency control rooms, and research projects.
                    </p>
                  </>
                )}

                {activePopup === 'pricing' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Pricing Overview
                    </h2>
                    <p className="text-slate-300 mb-3">
                      We design plans for individuals, coastal businesses, and public agencies.
                    </p>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                      <li>Starter access for basic alerts and public maps.</li>
                      <li>Professional plans with advanced analytics and reporting.</li>
                      <li>Custom agreements for cities, ports, and national agencies.</li>
                    </ul>
                  </>
                )}

                {activePopup === 'docs' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Documentation
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Technical and operational documentation for using OceanShield effectively.
                    </p>
                    <p className="text-slate-300">
                      It covers account setup, dashboards, alert workflows, and developer
                      integration guides.
                    </p>
                  </>
                )}

                {activePopup === 'support' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Support Center
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Find answers to common questions and get help from our team.
                    </p>
                    <p className="text-slate-300">
                      For urgent operational issues, you can reach us at
                      <span className="font-medium text-blue-400"> support@oceanshield.com</span>.
                    </p>
                  </>
                )}

                {activePopup === 'community' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Community Forum
                    </h2>
                    <p className="text-slate-300 mb-3">
                      A place for users, coastal operators, and researchers to exchange ideas and best practices.
                    </p>
                    <p className="text-slate-300">
                      Share how you use OceanShield, suggest improvements, and collaborate on safer oceans.
                    </p>
                  </>
                )}

                {activePopup === 'policies' && (
                  <>
                    <h2 className="text-2xl font-semibold text-white mb-3">
                      Ocean Data Policies
                    </h2>
                    <p className="text-slate-300 mb-3">
                      Learn how we collect, process, and share ocean-related data.
                    </p>
                    <p className="text-slate-300 mb-3">
                      This includes crowdsourced reports, sensor feeds, and third‑party datasets,
                      with a focus on privacy and responsible use.
                    </p>
                    <p className="text-slate-300">
                      Our goal is to balance transparency, safety, and respect for local regulations.
                    </p>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </footer>
  );
};

export default Footer;