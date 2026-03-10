import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Register = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', adminCode: '' });
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/register', formData);
            localStorage.setItem('token', response.data.token);
            // Save user object with role data to secure RBAC layout out of the box
            localStorage.setItem('user', JSON.stringify({
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                role: response.data.role
            }));

            if (response.data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || t('AuthRegFail', 'Failed to register'));
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
                        <h1 className="text-3xl font-bold text-white tracking-tight">{t('AuthRegTitle', 'Create Account')}</h1>
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
                                    type="text"
                                    placeholder={t('AuthFullName', 'Full Name')}
                                    className="input-field"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>
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
                                    minLength={6}
                                />
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    checked={isAdmin}
                                    onChange={(e) => {
                                        setIsAdmin(e.target.checked);
                                        if (!e.target.checked) setFormData({ ...formData, adminCode: '' });
                                    }}
                                    className="w-4 h-4 rounded border-gray-600 bg-gray-700/50 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                                />
                                <label htmlFor="isAdmin" className="text-sm text-gray-300 select-none cursor-pointer">
                                    {t('AuthRegAdmin', 'Register as an Administrator')}
                                </label>
                            </div>

                            {isAdmin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="pt-2"
                                >
                                    <input
                                        type="password"
                                        placeholder={t('AuthAdminCode', 'Admin Secret Verification Code')}
                                        className="input-field border-orange-500/50 focus:border-orange-500 focus:ring-orange-500/20"
                                        value={formData.adminCode}
                                        onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })}
                                        required={isAdmin}
                                    />
                                    <p className="text-xs text-gray-400 mt-2">
                                        {t('AuthAdminCodeHint', 'Only enter this code if you have been authorized.')}
                                    </p>
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : t('AuthSignUpBtn', 'Sign Up')}
                        </button>

                        <p className="text-center text-gray-400 text-sm mt-6">
                            {t('AuthHasAccount', 'Already have an account?')} {' '}
                            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                                {t('AuthLoginLink', 'Log in')}
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
