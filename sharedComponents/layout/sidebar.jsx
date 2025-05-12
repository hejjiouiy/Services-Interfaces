'use client';
import { useState, useEffect } from "react";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Define the component
const Sidebar = () => {
    const pathname = usePathname();
    
    const links = [
        { name: "Dashboard", path: "/" },
        { name: "General Services", path: "/Services" },
        { name: "Event", path: "/Events" },
        { name: "Purchase", path: "/Purchase" },
        { name: "Storage Management", path: "/warehouse" }
    ];
    
    // Initialize state with current path match
    const getCurrentPageName = () => {
        const currentLink = links.find(link => link.path === pathname);
        return currentLink ? currentLink.name : "Dashboard"; // Default to Dashboard if no match
    };
    
    // Set selected page based on current path right from initialization
    const [selectedPage, setSelectedPage] = useState(getCurrentPageName);
    
    // Update selected page when pathname changes
    useEffect(() => {
        setSelectedPage(getCurrentPageName());
    }, [pathname]);

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
                    {links.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.path}
                            className={`
                                w-full mb-4 p-2 flex items-center justify-between
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
                    ))}
                </div>
            </nav>
        </aside>
    );
};

// Export the component
export default Sidebar;