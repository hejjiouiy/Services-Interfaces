import React from 'react';
import FeatureCard from './FeatureCard';
import { useFeatureGrid } from '../../hooks/useFeatureGrid';

const FeatureGrid = ({ features }) => {
    const { shuffledFeatures, hoveredCard, setHoveredCard } = useFeatureGrid(features);

    return (
        <div className="grid grid-cols-4 gap-5 mb-12">
            {shuffledFeatures.map((feature, index) => (
                <FeatureCard
                    key={index}
                    feature={feature}
                    index={index}
                    hoveredCard={hoveredCard}
                    onMouseEnter={setHoveredCard}
                    onMouseLeave={() => setHoveredCard(null)}
                />
            ))}
        </div>
    );
};

export default FeatureGrid;