import { useState } from 'react';

export const useTouch = (onSwipeLeft, onSwipeRight, threshold = 100) => {
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > threshold) {
            onSwipeLeft();
        } else if (touchStart - touchEnd < -threshold) {
            onSwipeRight();
        }
    };

    return {
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd
    };
};