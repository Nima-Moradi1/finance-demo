import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Recursive } from 'next/font/google'
import { Toaster } from "react-hot-toast";

const recursive = Recursive({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Finance Demo",
  description: "Just a Demo for presentation!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${recursive.className} bg-slate-50`}>
        <MaxWidthWrapper>
          {children}
          <Toaster/>  
        </MaxWidthWrapper>
        
        </body>
    </html>
  );
}
