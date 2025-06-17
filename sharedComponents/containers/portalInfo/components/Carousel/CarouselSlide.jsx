import React from 'react';
import Link from 'next/link';

const CarouselSlide = ({ 
    slide, 
    index, 
    positionClass, 
    slideRef 
}) => {
    return (
        <div 
            ref={slideRef}
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
                relative z-20 max-w-lg p-10 ml-10 mt-10
                transform transition-all duration-700 ease-out
                ${positionClass === 'active' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}>
                {/* Futuristic Line Accent */}
                <div className="absolute left-0 top-0 w-1 h-16 bg-main-green"></div>
                
                {/* Content */}
                <div className="pl-6">
                    <h3 className="text-3xl font-bold text-white mb-2 text-shadow-sm">
                        {slide.title}
                    </h3>
                    <div className="w-20 h-1 bg-main-green mb-6 transform origin-left transition-transform duration-700 delay-100 ease-out scale-x-100"></div>
                    <p className="mb-8 text-white/95 text-lg font-normal leading-relaxed tracking-wide text-shadow-xs">
                        {slide.description}
                    </p>
                    
                    {/* Modern Buttons */}
                    <div className="flex space-x-4 mt-8">
                        <Link 
                            href={slide.primaryButton.href}
                            className="bg-main-green text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all duration-300 shadow-lg backdrop-blur-sm border border-white/10 hover:translate-y-[-2px]"
                        >
                            {slide.primaryButton.label}
                            <span className="ml-2 inline-block">→</span>
                        </Link>
                        <Link 
                            href={slide.secondaryButton.href}
                            className="bg-white/15 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/25 transition-all duration-300 hover:translate-y-[-2px]"
                        >
                            {slide.secondaryButton.label}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarouselSlide;