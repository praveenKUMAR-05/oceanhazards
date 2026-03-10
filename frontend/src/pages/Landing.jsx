import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import PlatformOverview from '../components/landing/PlatformOverview';
import KeyFeatures from '../components/landing/KeyFeatures';
import LivePreview from '../components/landing/LivePreview';
import TechnologyStack from '../components/landing/TechnologyStack';
import IndustryImpact from '../components/landing/IndustryImpact';
import Developers from '../components/landing/Developers';
import Testimonials from '../components/landing/Testimonials';
import Contact from '../components/landing/Contact';
import CTA from '../components/landing/CTA';
import Footer from '../components/landing/Footer';

const Landing = () => {
    // Smooth scroll for anchor links
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        // Handle initial load
        handleHashChange();

        // Listen for browser back/forward buttons (which change the hash)
        window.addEventListener('hashchange', handleHashChange);
        window.addEventListener('popstate', handleHashChange);

        // Custom click handler for smooth scrolling without jumping
        const clickHandler = function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Update URL without triggering hashchange event, history will record it
                    window.history.pushState(null, '', targetId);
                }
            }
        };

        // Add event listener for local navLinks
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', clickHandler);
        });

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            window.removeEventListener('popstate', handleHashChange);
            links.forEach(link => {
                link.removeEventListener('click', clickHandler);
            });
        };
    }, []);

    return (
        <div className="bg-slate-950 text-slate-200 font-sans overflow-x-hidden">
            <Navbar />

            <main>
                <Hero />
                <PlatformOverview />
                <KeyFeatures />
                <LivePreview />
                <TechnologyStack />
                <IndustryImpact />
                <Developers />
                <Testimonials />
                <Contact />
                <CTA />
            </main>

            <Footer />
        </div>
    );
};

export default Landing;
