// app/client-layout.js (Client Component)
"use client";

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Sidebar from "../sharedComponents/layout/sidebar";
import Header from "../sharedComponents/layout/header";
import Footer from "../sharedComponents/layout/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the current page is a login/registration/test page
  const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/test';

  // Effect to determine if the screen is mobile size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Tailwind's 'lg' breakpoint is 1024px
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Listen for resize events
    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup listener
  }, []);

  // If it's an authentication-related page, render only the children
  if (isAuthPage) {
    return (
      <main>
        {children}
      </main>
    );
  }

  // For all other pages, render the layout with sidebar, header, and footer
  return (
    <>
      <div className="flex w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
        {/* Sidebar */}
        {/* The Sidebar component itself handles its mobile visibility (fixed position, translate-x) */}
        <Sidebar />

        {/* Main content area */}
        {/* This div dynamically adjusts its left margin based on sidebar state */}
        <div className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out w-full
          ${isMobile ? 'ml-0' : 'ml-16 lg:ml-70'}
        `}>
          <Header isMobile={isMobile} />
<main className={`
  flex-1 w-full p-4 md:p-6 lg:p-8
  ${isMobile ? 'pt-20' : ''}
`}>
  {children}
</main>
               
        

        </div>
      </div><Footer />
    </>
  );
}