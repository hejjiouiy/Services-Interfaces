import React from 'react';

const CarouselIndicators = ({ 
    slides, 
    currentSlide, 
    onSlideChange, 
    isAnimating 
}) => {
    return (
        <div className="flex space-x-3">
            {slides.map((_, index) => (
                <button
                    key={index}
                    className={`
                        transition-all duration-500 ease-out
                        ${currentSlide === index 
                            ? "w-8 h-2 bg-main-green rounded-full" 
                            : "w-2 h-2 bg-white/60 rounded-full hover:bg-white/90"
                        }
                    `}
                    onClick={() => onSlideChange(index)}
                    disabled={isAnimating}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
        </div>
    );
};

export default CarouselIndicators;