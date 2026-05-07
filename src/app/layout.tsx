import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduNaija - AI Academic Platform for Nigerian Students",
  description: "The ultimate AI-powered academic platform for Nigerian university students. Study smarter with AI tutors, past questions, and community resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-xl text-gray-900">EduNaija</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Pricing
                </Link>
                <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </Link>
              </nav>
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
                  Log in
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    Sign up free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">E</span>
                  </div>
                  <span className="font-bold text-gray-900">EduNaija</span>
                </div>
                <p className="text-sm text-gray-600">
                  Empowering Nigerian students with AI-driven academic tools.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
