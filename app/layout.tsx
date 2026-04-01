import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageTransition from "@/components/shared/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fashion-mv | Modern Fashion Store",
  description: "A modern e-commerce fashion platform built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-[#f5f5f5]">
            <Header />
            <PageTransition>
              <main className="min-h-[calc(100vh-220px)] pb-20 md:pb-0">
                {children}
              </main>
            </PageTransition>
            <Footer />
            <MobileNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}
