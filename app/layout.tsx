import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import ProtectedWrapper from "@/components/ProtectedWrapper/ProtectedWrapper";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leads Dashboard",
  description:
    "A modern, intuitive CRM dashboard to track, manage, and visualize your leads effortlessly ",
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
        <ReduxProvider>
          <ProtectedWrapper>
            <Navbar />
            {children}
          </ProtectedWrapper>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
