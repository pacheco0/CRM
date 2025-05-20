import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM Pro - Professional Customer Relationship Management",
  description: "A modern CRM application built with Next.js and React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-50">
          <div className="fixed inset-y-0 left-0 z-10 w-64 transform lg:relative lg:translate-x-0">
            <Sidebar />
          </div>
          <div className="flex w-0 flex-1 flex-col lg:pl-64">
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
