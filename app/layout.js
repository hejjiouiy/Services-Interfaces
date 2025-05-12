import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/sharedComponents/layout/sidebar";
import Header from "@/sharedComponents/layout/header";
import Footer from "@/sharedComponents/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FMS Web Services",
  description: "FMS Web Services",
};

export default function Layout({ children }) {
  return (
    <html lang="en" >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${metadata.title}</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-main-beige`}>
        <div className="grid grid-cols-5 min-h-screen font-[family-name:var(--font-geist-sans)]">
          <div className="h-screen border-2 border-gray-200 w-fit rounded-lg col-span-1">
            <Sidebar />
          </div>
          <div className="col-span-4 w-full m-0 p-0 flex flex-col">
            <Header />
            <main className="w-[95%] ">
              {children}
            </main>
          </div>
        </div>
        
        <div className="w-full">
          <Footer />
        </div>
      </body>
    </html>
  );
}