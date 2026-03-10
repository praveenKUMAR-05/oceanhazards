import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('Home'), href: '#home' },
        { name: t('Features'), href: '#features' },
        { name: t('Technology'), href: '#technology' },
        { name: t('Solutions'), href: '#solutions' },
        { name: t('Developers'), href: '#developers' },
        { name: t('Contact'), href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50 shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Shield className="h-8 w-8 text-blue-500" />
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                            OceanShield
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6">

                        {/* Language Selector */}
                        <LanguageSwitcher />

                        <Link
                            to="/login"
                            className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                        >
                            {t('Login')}
                        </Link>
                        <Link
                            to="/register"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                        >
                            {t('Register')}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-slate-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-slate-300 hover:text-white text-base font-medium py-2"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-slate-800 flex flex-col gap-4">
                                <Link
                                    to="/login"
                                    className="block text-slate-300 hover:text-white text-base font-medium"
                                >
                                    {t('Login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="block bg-blue-600 text-center hover:bg-blue-700 text-white px-5 py-3 rounded-md text-base font-medium"
                                >
                                    {t('Register')}
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    );
};

export default Navbar;
