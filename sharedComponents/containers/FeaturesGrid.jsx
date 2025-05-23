'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { featuresData } from './data/featuresData';

const FeaturesGrid = () => {
    const [shuffledFeatures, setShuffledFeatures] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    function shuffleArray(array) {
        const newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    }

    useEffect(() => {
        setShuffledFeatures(shuffleArray(featuresData));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-8 lg:mb-12 px-4 sm:px-6">
            {shuffledFeatures.map((feature, index) => (
                <div 
                    key={index} 
                    className="relative h-[240px] sm:h-[260px] lg:h-[280px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out group"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                >
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} transition-all duration-500`}></div>
                    
                    {/* Animated circles for futuristic effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-10">
                        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full border border-white/30 transform scale-0 group-hover:scale-100 transition-all duration-700 ease-out"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full border border-white/30 transform scale-0 group-hover:scale-100 transition-all duration-700 delay-100 ease-out"></div>
                        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-white/5 transform scale-0 group-hover:scale-100 transition-all duration-700 delay-150 ease-out"></div>
                    </div>
                    
                    {/* Card content */}
                    <div className="relative z-10 h-full flex flex-col p-4 sm:p-5">
                        {/* Icon */}
                        <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm w-fit">
                            <div className="w-8 h-8 sm:w-10 sm:h-10">
                                {feature.icon}
                            </div>
                        </div>
                        
                        {/* Content */}
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-auto line-clamp-3">
                            {feature.description}
                        </p>
                        
                        {/* Action button */}
                        <div className="mt-3 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <Link 
                                href={feature.link} 
                                className="inline-flex items-center text-white font-medium text-xs sm:text-sm py-2 px-3 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20"
                            >
                                {feature.linkText}
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className="h-3 w-3 sm:h-4 sm:w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturesGrid;