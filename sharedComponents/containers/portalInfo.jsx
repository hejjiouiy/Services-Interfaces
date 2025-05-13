'use client';
import React, { useState, useEffect, useRef , useMemo } from 'react';
import Link from 'next/link';
import StatsSection from './statsSection';


const PortalInfo = () => {
    // Carousel slides
    const carouselSlides = [
        {
            title: "Streamline Your Administrative Tasks",
            description: "The SHCC Portal brings together all the services you need in one convenient location, saving you time and simplifying your work processes.",
            image: "/images/shcc.png",
            primaryButton: { label: "Explore Services", href: "/Services" },
            secondaryButton: { label: "View Calendar", href: "/Events" }
        },
        {
            title: "Manage Events with Ease",
            description: "Plan, schedule, and coordinate events efficiently with our integrated calendar and booking tools.",
            image: "/images/wide-angle.png",
            primaryButton: { label: "Plan an Event", href: "/Events" },
            secondaryButton: { label: "View Resources", href: "/Services" }
        },
        {
            title: "Simplified Procurement Process",
            description: "Submit purchase requests and track them from submission to delivery in real-time.",
            image: "/images/hospital.png",
            primaryButton: { label: "Submit Request", href: "/Purchase" },
            secondaryButton: { label: "View Inventory", href: "/warehouse" }
        }
    ];
    function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
    }

    const [shuffledFeatures, setShuffledFeatures] = useState([]);

    useEffect(() => {
        setShuffledFeatures(shuffleArray(features));
    }, []);

    // Features of the portal with redirection links
    // Version alternative avec combinaisons et directions différentes
const features = [
    {
        title: "Service Requests",
        description: "Submit and track requests for various services including access, housing, and catering",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg>
        ),
        gradient: "bg-[#00543F]",
        link: "/Services",
        linkText: "Explore Services"
    },
    {
        title: "Event Management",
        description: "Plan, schedule, and manage events with integrated calendars and room bookings",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-calendar3" viewBox="0 0 16 16">
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
        ),
        gradient: "bg-[#00543F]",
        link: "/Events",
        linkText: "Plan an Event"
    },
    {
        title: "Procurement",
        description: "Manage purchase requests and track orders from submission to delivery",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" className="bi bi-cart3" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
        ),
        gradient: "bg-[#00543F]",
        link: "/Purchase",
        linkText: "Submit Request"
    },
    {
        title: "Storage Management",
        description: "Monitor inventory, track assets, and manage warehouse operations",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" className="text-white">
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113M15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
            </svg>
        ),
        gradient: "bg-[#00543F]  ",
        link: "/warehouse",
        linkText: "View Inventory"
    }
];

    // State for carousel
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const slideRefs = useRef([]);
    const [hoveredCard, setHoveredCard] = useState(null);

    // Auto-advance carousel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 6000); // Change slide every 6 seconds

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Navigate to a specific slide
    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 750); // Animation duration
    };

    // Navigate to next/previous slide
    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        setTimeout(() => setIsAnimating(false), 750); // Animation duration
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 750); // Animation duration
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
            // Swiped left
            nextSlide();
        } else if (touchStart - touchEnd < -100) {
            // Swiped right
            prevSlide();
        }
    };

    // Calculate slide position class
    const getSlidePositionClass = (index) => {
        if (index === currentSlide) return "active";
        
        // For a 3-slide carousel
        if (carouselSlides.length === 3) {
            if ((currentSlide === 0 && index === 2) || (index === currentSlide - 1)) 
                return "prev";
            if ((currentSlide === 2 && index === 0) || (index === currentSlide + 1)) 
                return "next";
        }
        
        // For more slides, handle appropriately
        const isNext = (index === (currentSlide + 1) % carouselSlides.length);
        const isPrev = (index === (currentSlide - 1 + carouselSlides.length) % carouselSlides.length);
        
        if (isNext) return "next";
        if (isPrev) return "prev";
        
        return "hidden";
    };

    return (
        <div className="bg-main-beige py-8 rounded-lg w-[95%] mx-auto my-10">
            {/* Section title */}
            <div className="mb-10 border-b-[2px] border-gray-200 pb-4">
                <h2 className="text-3xl font-bold text-main-green">SHCC Portal Features</h2>
                <p className="text-darker-beige mt-2">
                    Your centralized hub for all services and administrative needs
                </p>
            </div>
            
            {/* Futuristic Features grid */}
            <div className="grid grid-cols-4 gap-5 mb-12">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="relative h-[280px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out group"
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
                        <div className="relative z-10 h-full flex flex-col p-5">
                            {/* Icon */}
                            <div className="mb-4 p-3 rounded-full bg-white/10 backdrop-blur-sm w-fit">
                                {feature.icon}
                            </div>
                            
                            {/* Content */}
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-white/80 text-sm mb-auto">{feature.description}</p>
                            
                            {/* Action button */}
                            <div className="mt-3 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <Link 
                                    href={feature.link} 
                                    className="inline-flex items-center text-white font-medium text-sm py-2 px-3 bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-200 ease-in-out hover:bg-white/20"
                                >
                                    {feature.linkText}
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className="h-4 w-4 ml-1 transform transition-transform duration-200 group-hover:translate-x-1" 
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
            
            {/* Modern Carousel */}
            <div 
                className="mt-14 relative overflow-hidden rounded-xl shadow-2xl h-[500px] perspective"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Adaptive Gradient Overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-black/40 z-10"></div>
                
                {/* Animated Carousel Container */}
                <div className="carousel-container h-full w-full relative">
                    {carouselSlides.map((slide, index) => {
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
                                {/* Content container with soft background for better text readability */}
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
                    })}
                </div>
                
                {/* Modern Navigation Controls */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 z-30">
                    {/* Previous button */}
                    <button 
                        className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                        onClick={prevSlide}
                        disabled={isAnimating}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                    
                    {/* Slide indicators */}
                    <div className="flex space-x-3">
                        {carouselSlides.map((_, index) => (
                            <button
                                key={index}
                                className={`
                                    transition-all duration-500 ease-out
                                    ${currentSlide === index 
                                        ? "w-8 h-2 bg-main-green rounded-full" 
                                        : "w-2 h-2 bg-white/60 rounded-full hover:bg-white/90"
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
                        className="w-10 h-10 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/25 transition-all duration-300"
                        onClick={nextSlide}
                        disabled={isAnimating}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </div>
            </div>
            

            <StatsSection  />

        </div>
    );
};
// Add custom styles
const styles = `
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
    transform-style: preservclassNamee-3d;
}

.carousel-slide.active {
    transform: translateX(0) scale(1);
    z-index: 20;
    opacity: 1;
}

.carousel-slide.prev {
    transform: translateX(-100%) scale(0.9);
    z-index: 10;
    opacity: 0.7;className
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

// Insert the styles into the document
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
}

export default PortalInfo;