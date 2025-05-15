'use client';
import { useState, useEffect } from "react";
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
            subLinks: [
                { name: "Portal Features", path: "/" },
                { name: "General Informations", path: "/informations" }
            ]
        },
        { name: "General Services", path: "/Services" },
        { name: "Event", path: "/Events" },
        { name: "Purchase", path: "/Purchase" },
        { name: "Storage Management", path: "/warehouse" }
    ];
    
    const [expandedMenu, setExpandedMenu] = useState(null);
    const [selectedPage, setSelectedPage] = useState("");

    // Initialize selected page and expanded menu
    useEffect(() => {
        const currentMainLink = mainLinks.find(link => 
            link.path === pathname || 
            (link.subLinks && link.subLinks.some(sub => sub.path === pathname))
        );

        if (currentMainLink) {
            if (currentMainLink.subLinks) {
                const currentSubLink = currentMainLink.subLinks.find(sub => sub.path === pathname);
                setSelectedPage(currentSubLink ? currentSubLink.name : currentMainLink.subLinks[0].name);
                setExpandedMenu(currentMainLink.name);
            } else {
                setSelectedPage(currentMainLink.name);
                // Close Dashboard menu when another main link is selected
                setExpandedMenu(null);
            }
        } else {
            setSelectedPage("General Services"); // Default
            setExpandedMenu(null);
        }
    }, [pathname]);

    const toggleMenu = (menuName) => {
        setExpandedMenu(expandedMenu === menuName ? null : menuName);
    };

    // Handle logout
    const handleLogout = () => {
        // In a real application, you would clear auth tokens, cookies, etc.
        // For now, just redirect to login page
        router.push('/login');
    };

    // Check if current path is a sublink of Dashboard
    const isDashboardSubLink = mainLinks[0].subLinks.some(sub => sub.path === pathname);

    return (
        <aside className="m-0 p-0 fixed top-0 left-0 w-64 h-screen bg-main-beige text-main-green overflow-y-auto z-10">
            <nav className="flex flex-col items-start justify-start p-4">
                <div className="flex items-center mb-4 w-full ml-4">
                    <h1 className="flex justify-between my-14 w-[80%]">
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm">
                            S
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm">
                            H
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm">
                            C
                        </span>
                        <span className="text-4xl flex text-center justify-center my-auto p-auto h-10 w-10 font-bold text-main-beige bg-main-green rounded-sm">
                            C
                        </span>
                    </h1>
                </div>
                <div className="m-auto flex flex-col w-full">
                    {mainLinks.map((link) => (
                        <div key={link.name} className="w-full mb-1">
                            {link.subLinks ? (
                                <>
                                    <div 
                                        onClick={() => toggleMenu(link.name)}
                                        className={`
                                            w-full p-2 flex items-center justify-between cursor-pointer
                                            hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold 
                                            transition-all duration-300 ease-in-out
                                            ${(expandedMenu === link.name || isDashboardSubLink) ?
                                                "bg-main-green text-main-beige font-bold rounded-sm shadow-lg" :
                                                "text-main-green font-normal rounded-sm"
                                            }
                                        `}
                                    >
                                        <span>{link.name}</span>
                                        <span className="mr-2 transition-transform duration-300 transform">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                width="24" 
                                                height="24" 
                                                fill="currentColor" 
                                                className={`bi bi-caret-right ${(expandedMenu === link.name || isDashboardSubLink) ? 'rotate-90' : ''}`} 
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                                            </svg>
                                        </span>
                                    </div>
                                    
                                    {(expandedMenu === link.name || isDashboardSubLink) && (
                                        <div className="ml-4 mt-1">
                                            {link.subLinks.map((subLink) => (
                                                <Link
                                                    key={subLink.name}
                                                    href={subLink.path}
                                                    className={`
                                                        block w-full mb-1 p-2
                                                        hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold 
                                                        transition-all duration-300 ease-in-out
                                                        ${selectedPage === subLink.name ?
                                                            "bg-main-green/90 text-main-beige font-bold rounded-sm shadow-lg border-l-4 border-white" :
                                                            "text-main-green font-normal rounded-sm"
                                                        }
                                                    `}
                                                >
                                                    {subLink.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link 
                                    href={link.path}
                                    onClick={() => {
                                        setSelectedPage(link.name);
                                        setExpandedMenu(null); // Close Dashboard menu when another link is clicked
                                    }}
                                    className={`
                                        w-full p-2 flex items-center justify-between
                                        hover:bg-main-green hover:rounded-sm hover:text-main-beige hover:font-bold 
                                        transition-all duration-300 ease-in-out
                                        ${selectedPage === link.name ?
                                            "bg-main-green text-main-beige font-bold rounded-sm shadow-lg border-r-4 border-white" :
                                            "text-main-green font-normal rounded-sm"
                                        }
                                    `}
                                >
                                    <span>{link.name}</span>
                                    {selectedPage === link.name && (
                                        <span className="mr-2 transition-transform duration-300 transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                <path d="M6 12.796V3.204L11.481 8zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753"/>
                                            </svg>
                                        </span>
                                    )}
                                </Link>
                            )}
                        </div>
                    ))}
                    
                    {/* Logout button right after the navigation links */}
                    <div className="w-full mt-6 mb-4">
                        <div className="w-full h-px bg-main-green/20 mb-6"></div>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center justify-between p-2 rounded-sm hover:bg-red-600 hover:text-white transition-colors duration-300"
                        >
                            <span className="font-medium">Logout</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;