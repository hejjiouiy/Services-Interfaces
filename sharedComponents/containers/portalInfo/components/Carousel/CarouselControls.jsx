import React from 'react';
import CarouselIndicators from './CarouselIndicators';

const CarouselControls = ({ 
    slides, 
    currentSlide, 
    onPrevious, 
    onNext, 
    onSlideChange, 
    isAnimating 
}) => {
    return (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-30">
            {/* Previous button */}
            <button 
                className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                onClick={onPrevious}
                disabled={isAnimating}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
            </button>
            
            {/* Slide indicators */}
            <CarouselIndicators
                slides={slides}
                currentSlide={currentSlide}
                onSlideChange={onSlideChange}
                isAnimating={isAnimating}
            />
            
            {/* Next button */}
            <button 
                className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                onClick={onNext}
                disabled={isAnimating}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
            </button>
        </div>
    );
};

export default CarouselControls;