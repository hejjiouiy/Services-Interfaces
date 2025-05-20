// app/client-layout.js (Client Component)
"use client";

import { usePathname } from 'next/navigation';
import Sidebar from "../sharedComponents/layout/sidebar";
import Header from "../sharedComponents/layout/header";
import Footer from "../sharedComponents/layout/Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/register';

  if (isLoginPage) {
    return (
      <main>
        {children}
      </main>
    );
  }

  return (
    <>
      <div className="grid grid-cols-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
        <div className="h-screen border-2 border-gray-200 w-fit rounded-lg col-span-1 sticky">
          <Sidebar />
        </div>
        <div className="col-span-4 w-full m-0 p-0 flex flex-col">
          <Header />
          <main className="w-[95%]">
            {children}
          </main>
        </div>
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}