import { useState, useEffect, useRef } from 'react';
import { animationConfig } from '../config/animations';

export const useCarousel = (slidesLength) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const slideRefs = useRef([]);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, animationConfig.autoAdvanceInterval);

        return () => clearInterval(interval);
    }, [isAnimating]);

    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), animationConfig.slideTransition);
    };

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slidesLength);
        setTimeout(() => setIsAnimating(false), animationConfig.slideTransition);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? slidesLength - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), animationConfig.slideTransition);
    };

    // Calculate slide position class
    const getSlidePositionClass = (index) => {
        if (index === currentSlide) return "active";
        
        if (slidesLength === 3) {
            if ((currentSlide === 0 && index === 2) || (index === currentSlide - 1)) 
                return "prev";
            if ((currentSlide === 2 && index === 0) || (index === currentSlide + 1)) 
                return "next";
        }
        
        const isNext = (index === (currentSlide + 1) % slidesLength);
        const isPrev = (index === (currentSlide - 1 + slidesLength) % slidesLength);
        
        if (isNext) return "next";
        if (isPrev) return "prev";
        
        return "hidden";
    };

    return {
        currentSlide,
        isAnimating,
        slideRefs,
        goToSlide,
        nextSlide,
        prevSlide,
        getSlidePositionClass
    };
};