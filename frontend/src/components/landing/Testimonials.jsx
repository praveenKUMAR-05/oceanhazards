import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Testimonials = () => {
    const { t } = useTranslation();
    const testimonials = [
        {
            text: t('Testimonial1', "OceanShield transformed how we navigate coastal waters. The AI verification filters out the noise, giving us only the alerts that matter. It's an indispensable tool for our modern fleet operations."),
            author: "Captain Marcus Thorne",
            role: t('Testimonial1Role', "Commercial Deep-Sea Fisherman"),
            rating: 5
        },
        {
            text: t('Testimonial2', "As a safety officer, coordinating responses used to rely on fragmented reports via VHF. Now, the live mapping and geospatial clustering allow us to dispatch units precisely where they are needed."),
            author: "Elena Rodriguez",
            role: t('Testimonial2Role', "Coastal Safety Official"),
            rating: 5
        },
        {
            text: t('Testimonial3', "The integration of historical hazard data with live OpenWeather feeds provides incredible predictive value. We use OceanShield's API for regional environmental tracking daily."),
            author: "Dr. James Chen",
            role: t('Testimonial3Role', "Marine Biologist & Researcher"),
            rating: 5
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const variants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 100 : -100,
                opacity: 0
            };
        },
        center: {
            z: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
                z: 0,
                x: direction < 0 ? 100 : -100,
                opacity: 0
            };
        }
    };

    return (
        <section className="py-24 bg-slate-900 overflow-hidden relative border-t border-slate-800">

            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-white"
                    >
                        {t('TestimonialsHeading', 'Trusted by Maritime')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{t('TestimonialsProf', 'Professionals')}</span>
                    </motion.h2>
                </div>

                <div className="relative h-[350px] md:h-[280px] w-full max-w-4xl mx-auto perspective-1000">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-slate-800 -z-10">
                        <Quote className="w-32 h-32" />
                    </div>

                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-12"
                        >

                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed italic mb-8">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div>
                                <h4 className="text-lg font-bold text-white">{testimonials[currentIndex].author}</h4>
                                <p className="text-blue-400 text-sm font-medium">{testimonials[currentIndex].role}</p>
                            </div>

                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > currentIndex ? 1 : -1);
                                    setCurrentIndex(i);
                                }}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? 'bg-blue-500 w-6' : 'bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white transition-colors border border-slate-700"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
