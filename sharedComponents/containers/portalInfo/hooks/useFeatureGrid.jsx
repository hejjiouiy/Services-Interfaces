import { useState, useEffect } from 'react';
import { shuffleArray } from '../utils/arrayUtils';

export const useFeatureGrid = (features) => {
    const [shuffledFeatures, setShuffledFeatures] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        setShuffledFeatures(shuffleArray(features));
    }, [features]);

    return {
        shuffledFeatures,
        hoveredCard,
        setHoveredCard
    };
};