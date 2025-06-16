export const carouselStyles = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes pulse {
    0%, 100% {
        opacity: 0.5;
    }
    50% {
        opacity: 0.8;
    }
}

.perspective {
    perspective: 1000px;
}

.carousel-slide {
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

.carousel-slide.active {
    transform: translateX(0) scale(1);
    z-index: 20;
    opacity: 1;
}

.carousel-slide.prev {
    transform: translateX(-100%) scale(0.9);
    z-index: 10;
    opacity: 0.7;
}

.carousel-slide.next {
    transform: translateX(100%) scale(0.9);
    z-index: 10;
    opacity: 0.7;
}

.carousel-slide.hidden {
    transform: translateX(0) scale(0.85);
    z-index: 0;
    opacity: 0;
}

.slide-content {
    animation: fadeInUp 0.7s ease-out forwards;
}

.text-shadow-xs {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
}

.text-shadow-sm {
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}
`;