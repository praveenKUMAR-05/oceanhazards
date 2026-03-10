import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ className = "" }) => {
    const { i18n } = useTranslation();
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    const languages = ['EN', 'ES', 'FR', 'Tamil'];

    // Ensure we have a valid current language
    const currentLang = languages.includes(i18n.language) ? i18n.language : 'EN';

    return (
        <div className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors text-sm font-medium z-[100]"
            >
                <Globe className="h-4 w-4" />
                {currentLang}
                <ChevronDown className="h-4 w-4" />
            </button>

            <AnimatePresence>
                {langDropdownOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-24 bg-slate-800 border border-slate-700 rounded-md shadow-xl overflow-hidden py-1 z-[100]"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang}
                                type="button"
                                onClick={() => {
                                    i18n.changeLanguage(lang);
                                    setLangDropdownOpen(false);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm ${currentLang === lang ? 'bg-blue-600 font-bold text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
