import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Load the user from local storage safely
    const userStr = localStorage.getItem('user');
    let user = null;
    try {
        user = userStr && userStr !== 'undefined' ? JSON.parse(userStr) : null;
    } catch (e) {
        console.error("Failed to parse user from localStorage", e);
    }

    return (
        <motion.nav
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="shrink-0 z-50 glass-panel border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6 text-blue-400" />
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            {t('NavBrand', 'OceanShield')}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher />

                        {user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className="px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {t('NavAdminDash', 'Admin Dashboard')}
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('NavLogout', 'Log Out')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
