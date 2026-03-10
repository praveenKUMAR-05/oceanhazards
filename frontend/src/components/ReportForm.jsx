import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, MapPin, Loader2, Image as ImageIcon, X, AlertTriangle } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const ReportForm = ({ onReportAdded, clickedCoordinates }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        description: '',
        latitude: '',
        longitude: '',
        image: null
    });

    useEffect(() => {
        if (clickedCoordinates) {
            setFormData(prev => ({
                ...prev,
                latitude: clickedCoordinates.lat.toFixed(6),
                longitude: clickedCoordinates.lng.toFixed(6)
            }));
        }
    }, [clickedCoordinates]);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    }));
                },
                (error) => setError(t('FormLocError', 'Could not get location. Please enter manually.'))
            );
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearImage = () => {
        setFormData({ ...formData, image: null });
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.latitude || !formData.longitude || !formData.description) {
            setError(t('FormReqError', 'Please fill in all required fields (Location and Description).'));
            return;
        }

        setLoading(true);
        setError('');

        const data = new FormData();
        data.append('description', formData.description);
        data.append('latitude', formData.latitude);
        data.append('longitude', formData.longitude);
        if (formData.image) {
            data.append('image', formData.image);
        }

        try {
            const response = await api.post('/reports', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            toast.success(t('FormSuccess', 'Report added successfully!'));

            if (onReportAdded) onReportAdded(response.data);

            // Reset form
            setFormData({ description: '', latitude: '', longitude: '', image: null });
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (err) {
            setError(err.response?.data?.message || t('FormFail', 'Failed to submit report.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="text-blue-400 w-5 h-5" /> {t('FormSubmitTitle', 'Submit Hazard Report')}
            </h2>

            {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-500/20">
                    {error}
                </motion.div>
            )}

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
                <p className="text-sm text-blue-400 font-medium">{t('FormAIHint', '✨ AI will automatically detect the hazard type from your uploaded image.')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{t('FormDescLabel', 'Description')}</label>
                    <textarea
                        className="input-field min-h-[100px] resize-none"
                        placeholder={t('FormDescPlaceholder', 'Describe the hazard (e.g., Oil spill, Plastic waste)...')}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">{t('FormLatLabel', 'Latitude')}</label>
                        <input
                            type="number"
                            step="any"
                            className="input-field"
                            placeholder={t('FormLatPlaceholder', 'e.g. 34.0522')}
                            value={formData.latitude}
                            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">{t('FormLngLabel', 'Longitude')}</label>
                        <input
                            type="number"
                            step="any"
                            className="input-field"
                            placeholder={t('FormLngPlaceholder', 'e.g. -118.2437')}
                            value={formData.longitude}
                            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                            required
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={getUserLocation}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 mt-1 transition-colors"
                >
                    <MapPin className="w-4 h-4" /> {t('FormLocBtn', 'Get current location')}
                </button>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">{t('FormImgLabel', 'Evidence Image')}</label>

                    <AnimatePresence mode="wait">
                        {imagePreview ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative rounded-lg overflow-hidden border border-white/10 group h-40"
                            >
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button type="button" onClick={clearImage} className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-500 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-pointer text-gray-400 hover:text-white group h-40"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImageIcon className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="text-sm font-medium">{t('FormUploadPrompt', 'Click to upload image')}</span>
                                <span className="text-xs opacity-50 mt-1">{t('FormUploadHint', 'PNG, JPG up to 5MB')}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 mt-6"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                        <>
                            <Upload className="w-5 h-5" /> {t('FormSubmitBtn', 'Submit Report')}
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ReportForm;
