import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            // Store user object to facilitate role-based access control (Admin vs Normal)
            localStorage.setItem('user', JSON.stringify(response.data.user || response.data));

            if (response.data.role === 'admin' || response.data.user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || t('AuthLoginFail', 'Failed to login'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            <div className="absolute top-4 right-4 z-50">
                <LanguageSwitcher className="bg-slate-800/50 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-panel rounded-2xl p-8">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                            <ShieldAlert className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">{t('AuthLoginTitle', 'OceanShield')}</h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    placeholder={t('AuthEmail', 'Email Address')}
                                    className="input-field"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder={t('AuthPassword', 'Password')}
                                    className="input-field"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('AuthLoginBtn', 'Log In')}
                        </button>

                        <p className="text-center text-gray-400 text-sm mt-6">
                            {t('AuthNoAccount', "Don't have an account?")}{' '}
                            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
                                {t('AuthSignUpLink', 'Sign up')}
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
