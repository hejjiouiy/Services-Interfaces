'use client';
import { useState, useEffect, useCallback } from "react";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const mainLinks = [
        {
            name: "Dashboard",
            path: "/",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
            ),
            subLinks: [
                { name: "Portal Features", path: "/" },
                { name: "General Informations", path: "/Informations" }
            ]
        },
        {
            name: "General Services",
            path: "/Process",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l-.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52z"/>
                </svg>
            )
        },
        {
            name: "Event",
            path: "/Events",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
                </svg>
            )
        },
        {
            name: "Purchase",
            path: "/Purchase",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5"/>
                </svg>
            )
        },
        {
            name: "Storage Management",
            path: "/Warehouse",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113M15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24z"/>
                </svg>
            )
        }
    ];

    const [expandedMenu, setExpandedMenu] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Effect to check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 1024); // Tailwind's 'lg' breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Effect to manage expanded menu based on current pathname
    useEffect(() => {
        const dashboardLink = mainLinks[0];
        const isCurrentPathDashboardSubLink = dashboardLink.subLinks && dashboardLink.subLinks.some(sub => sub.path === pathname);

        if (isCurrentPathDashboardSubLink) {
            setExpandedMenu(dashboardLink.name);
        } else {
            const currentMainLink = mainLinks.find(link => link.path === pathname);
            if (currentMainLink && currentMainLink.name !== "Dashboard") {
                setExpandedMenu(null);
            }
        }
    }, [pathname]);

    // Handlers
    const toggleMenu = useCallback((menuName) => {
        setExpandedMenu(prevMenu => (prevMenu === menuName ? null : menuName));
    }, []);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [isMobile]);

    const handleLogout = useCallback(() => {
        router.push('/login');
        closeSidebar();
    }, [router, closeSidebar]);

    // Helper Functions for Active/Class States
    const isActiveMainLink = useCallback((link) => {
        if (link.subLinks) {
            return link.subLinks.some(sub => pathname === sub.path);
        }
        return pathname === link.path;
    }, [pathname]);

    const isActiveSubLink = useCallback((subLinkPath) => {
        return pathname === subLinkPath;
    }, [pathname]);


    return (
        <>
            {/* Mobile Menu Button - Visible only on small screens */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-main-green text-main-beige rounded-md shadow-lg hover:bg-main-green/90 transition-colors duration-200"
                aria-label="Toggle menu"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </button>

            {/* Backdrop for mobile sidebar - Visible only when sidebar is open on mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar main container */}
            <aside className={`
                fixed top-0 left-0 bg-main-beige text-main-green overflow-y-auto z-40
                transition-all duration-300 ease-in-out
                ${isMobile
                    ? `w-80 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} h-screen` // Mobile: Full width on open, slide out on close, full height
                    : 'w-64 h-screen' // Desktop: Always 64 wide, full height
                }
            `}>
                <nav className="flex flex-col items-start justify-start p-4">
                    {/* Logo Section */}
                    <div className="flex items-center mb-6 w-full">
                        {/* Full logo for all visible states */}
                        <div className="flex items-center w-full"> {/* Removed ml-4 here to control it on h1 */}
                            <h1 className="flex mt-12"> {/* Changed w-[80%] to w-full */}
                                <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
                                    S
                                </span>
                                <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
                                    H
                                </span>
                                <span className="text-2xl items-center mr-2 sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
                                    C
                                </span>
                                <span className="text-2xl items-center sm:text-3xl flex text-center justify-center my-auto h-8 w-8 sm:h-10 sm:w-10 font-bold text-main-beige bg-main-green rounded-sm">
                                    C
                                </span>
                            </h1>
                        </div>

                        {/* Close button for mobile sidebar - Visible only when sidebar is open on mobile */}
                        {isMobile && (
                            <button
                                onClick={closeSidebar}
                                className="ml-auto p-1 hover:bg-main-green hover:text-main-beige rounded transition-colors duration-200"
                                aria-label="Close menu"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col w-full space-y-1">
                        {mainLinks.map((link) => (
                            <div key={link.name} className="w-full">
                                {link.subLinks ? (
                                    <>
                                        <div
                                            onClick={() => toggleMenu(link.name)}
                                            className={`
                                                w-full p-3 flex items-center cursor-pointer
                                                hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
                                                transition-all duration-300 ease-in-out
                                                ${(expandedMenu === link.name || isActiveMainLink(link)) ?
                                                    "bg-main-green text-main-beige font-bold rounded-sm shadow-lg" :
                                                    "text-main-green font-normal rounded-sm"
                                                }
                                            `}
                                            aria-expanded={expandedMenu === link.name || isActiveMainLink(link)}
                                        >
                                            <div className="flex items-center flex-1">
                                                <div className="flex-shrink-0">
                                                    {link.icon}
                                                </div>
                                                <span className={`ml-3`}> {/* Removed opacity transition and conditions */}
                                                    {link.name}
                                                </span>
                                            </div>
                                            <span className={`
                                                transition-all duration-300 transform flex-shrink-0
                                                ${(expandedMenu === link.name || isActiveMainLink(link)) ? 'rotate-90' : ''}
                                            `}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="currentColor"
                                                    className="bi bi-caret-right"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                                                </svg>
                                            </span>
                                        </div>

                                        {(expandedMenu === link.name || isActiveMainLink(link)) && (
                                            <div className={`
                                                mt-1 transition-all duration-300 ml-4
                                            `}>
                                                {link.subLinks.map((subLink) => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.path}
                                                        onClick={closeSidebar}
                                                        className={`
                                                            block w-full mb-1 p-2 pl-8
                                                            hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
                                                            transition-all duration-300 ease-in-out
                                                            ${isActiveSubLink(subLink.path) ?
                                                                "bg-main-green/90 text-main-beige font-bold rounded-sm shadow-lg border-l-4 border-white" :
                                                                "text-main-green font-normal rounded-sm"
                                                            }
                                                        `}
                                                    >
                                                        <span className={`transition-opacity duration-300`}>
                                                            {subLink.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link
                                        href={link.path}
                                        onClick={closeSidebar}
                                        className={`
                                            w-full p-3 flex items-center
                                            hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold
                                            transition-all duration-300 ease-in-out
                                            ${isActiveMainLink(link) ?
                                                "bg-main-green text-main-beige font-bold rounded-sm shadow-lg border-r-4 border-white" :
                                                "text-main-green font-normal rounded-sm"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center flex-1">
                                            <div className="flex-shrink-0">
                                                {link.icon}
                                            </div>
                                            <span className={`ml-3`}> {/* Removed opacity transition and conditions */}
                                                {link.name}
                                            </span>
                                        </div>
                                        {isActiveMainLink(link) && (
                                            <span className={`
                                                transition-opacity duration-300 flex-shrink-0
                                            `}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                    <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                                                </svg>
                                            </span>
                                        )}
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* Logout button */}
                        <div className="w-full mt-8">
                            <div className="w-full h-px bg-main-green/20 mb-4"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center p-3 rounded-sm hover:bg-red-600 hover:text-white transition-colors duration-300"
                            >
                                <div className="flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                </div>
                                <span className={`ml-3 font-medium transition-opacity duration-300`}>
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;