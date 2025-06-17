'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { carouselData } from './data/carouselData';

const CarouselSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const slideRefs = useRef([]);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Navigate to a specific slide
    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 750);
    };

    // Navigate to next/previous slide
    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
        setTimeout(() => setIsAnimating(false), 750);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 750);
    };

    // Touch handlers for mobile swiping
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 100) {
            nextSlide();
        } else if (touchStart - touchEnd < -100) {
            prevSlide();
        }
    };

    // Calculate slide position class
    const getSlidePositionClass = (index) => {
        if (index === currentSlide) return "active";
        
        if (carouselData.length === 3) {
            if ((currentSlide === 0 && index === 2) || (index === currentSlide - 1)) 
                return "prev";
            if ((currentSlide === 2 && index === 0) || (index === currentSlide + 1)) 
                return "next";
        }
        
        const isNext = (index === (currentSlide + 1) % carouselData.length);
        const isPrev = (index === (currentSlide - 1 + carouselData.length) % carouselData.length);
        
        if (isNext) return "next";
        if (isPrev) return "prev";
        
        return "hidden";
    };

    return (
        <div 
            className="mt-8 lg:mt-14 mx-4 sm:mx-6 relative overflow-hidden rounded-xl shadow-2xl h-[300px] sm:h-[400px] lg:h-[500px] perspective"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Adaptive Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/40 z-10"></div>
            
            {/* Carousel Container */}
            <div className="carousel-container h-full w-full relative">
                {carouselData.map((slide, index) => {
                    const positionClass = getSlidePositionClass(index);
                    return (
                        <div 
                            key={index}
                            ref={el => slideRefs.current[index] = el}
                            className={`carousel-slide absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out ${positionClass}`}
                            style={{ 
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Content container */}
                            <div className={`
                                slide-content bg-black/20 backdrop-blur-[2px] rounded-xl 
                                relative z-20 max-w-xs sm:max-w-sm lg:max-w-lg p-4 sm:p-6 lg:p-10 
                                ml-4 sm:ml-6 lg:ml-10 mt-4 sm:mt-6 lg:mt-10
                                transform transition-all duration-700 ease-out
                                ${positionClass === 'active' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            `}>
                                {/* Accent Line */}
                                <div className="absolute left-0 top-0 w-1 h-8 sm:h-12 lg:h-16 bg-main-green"></div>
                                
                                {/* Content */}
                                <div className="pl-3 sm:pl-4 lg:pl-6">
                                    <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 text-shadow-sm">
                                        {slide.title}
                                    </h3>
                                    <div className="w-12 sm:w-16 lg:w-20 h-1 bg-main-green mb-4 sm:mb-5 lg:mb-6 transform origin-left transition-transform duration-700 delay-100 ease-out scale-x-100"></div>
                                    <p className="mb-4 sm:mb-6 lg:mb-8 text-white/95 text-sm sm:text-base lg:text-lg font-normal leading-relaxed tracking-wide text-shadow-xs">
                                        {slide.description}
                                    </p>
                                    
                                    {/* Buttons */}
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-6 lg:mt-8">
                                        <Link 
                                            href={slide.primaryButton.href}
                                            className="bg-main-green text-white px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:translate-y-[-2px] text-sm sm:text-base text-center"
                                        >
                                            {slide.primaryButton.label}
                                            <span className="ml-2 inline-block">→</span>
                                        </Link>
                                        <Link 
                                            href={slide.secondaryButton.href}
                                            className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-lg font-medium hover:bg-white/25 transition-all duration-300 hover:translate-y-[-2px] text-sm sm:text-base text-center"
                                        >
                                            {slide.secondaryButton.label}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 sm:space-x-4 lg:space-x-6 z-30">
                {/* Previous button */}
                <button 
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                    onClick={prevSlide}
                    disabled={isAnimating}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                
                {/* Slide indicators */}
                <div className="flex space-x-2 sm:space-x-3">
                    {carouselData.map((_, index) => (
                        <button
                            key={index}
                            className={`
                                transition-all duration-500 ease-out
                                ${currentSlide === index 
                                    ? "w-6 sm:w-7 lg:w-8 h-1.5 sm:h-2 bg-main-green rounded-full" 
                                    : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/60 rounded-full hover:bg-white/90"
                                }
                            `}
                            onClick={() => goToSlide(index)}
                            disabled={isAnimating}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                
                {/* Next button */}
                <button 
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                    onClick={nextSlide}
                    disabled={isAnimating}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CarouselSection;