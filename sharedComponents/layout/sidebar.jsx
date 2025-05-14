'use client';
import { useState, useEffect } from "react";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    
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

    // Check if current path is a sublink of Dashboard
    const isDashboardSubLink = mainLinks[0].subLinks.some(sub => sub.path === pathname);

    return (
        <aside className="m-0 p-0 absolute top-0 left-0 w-64 h-screen bg-main-beige text-main-green ">
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
                <div className="m-auto h-full flex flex-col w-full">
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
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;