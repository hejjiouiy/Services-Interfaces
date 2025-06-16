import React from 'react';
import CarouselSlide from './CarouselSlide';
import CarouselControls from './CarouselControls';
import { useCarousel } from '../../hooks/useCarousel';
import { useTouch } from '../../hooks/useTouch';

const Carousel = ({ slides }) => {
    const {
        currentSlide,
        isAnimating,
        slideRefs,
        goToSlide,
        nextSlide,
        prevSlide,
        getSlidePositionClass
    } = useCarousel(slides.length);

    const {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    } = useTouch(nextSlide, prevSlide);

    return (
        <div 
            className="mt-14 relative overflow-hidden rounded-xl shadow-2xl h-[500px] perspective"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Adaptive Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/40 z-10"></div>
            
            {/* Animated Carousel Container */}
            <div className="carousel-container h-full w-full relative">
                {slides.map((slide, index) => (
                <CarouselSlide
                    key={index}
                    slide={slide}
                    index={index}
                    positionClass={getSlidePositionClass(index)}
                    slideRef={el => slideRefs.current[index] = el}
                />
            ))}
            </div>
            
            {/* Navigation Controls */}
            <CarouselControls
                slides={slides}
                currentSlide={currentSlide}
                onPrevious={prevSlide}
                onNext={nextSlide}
                onSlideChange={goToSlide}
                isAnimating={isAnimating}
            />
        </div>
    );
};

export default Carousel;