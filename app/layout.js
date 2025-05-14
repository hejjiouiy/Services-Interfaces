// app/layout.js (Server Component)
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client_layout";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-main-beige`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}