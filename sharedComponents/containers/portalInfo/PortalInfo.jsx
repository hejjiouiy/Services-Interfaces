'use client';
import React, { useEffect } from 'react';
import SectionHeader from './components/SectionHeader';
import FeatureGrid from './components/FeatureGrid';
import Carousel from './components/Carousel';
import StatsSection from './statsSection';
import { featuresConfig } from './config/featuresData';
import { carouselSlidesConfig } from './config/carouselData';
import { carouselStyles } from './styles/carousel.jsx';
import { injectStyles } from './utils/styleInjector';

const PortalInfo = () => {
    // Inject carousel styles
    useEffect(() => {
        injectStyles(carouselStyles);
    }, []);

    return (
        <div className="bg-main-beige py-8 rounded-lg w-[95%] mx-auto my-10">
            <SectionHeader 
                title="SHCC Portal Features"
                subtitle="Your centralized hub for all services and administrative needs"
            />
            
            <FeatureGrid features={featuresConfig} />
            
            <Carousel slides={carouselSlidesConfig} />
            
            <StatsSection />
        </div>
    );
};

export default PortalInfo;