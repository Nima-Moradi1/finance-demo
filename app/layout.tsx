

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Recursive } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/utils";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
const recursive = Recursive({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata
export const viewport : Viewport = {
  themeColor: 'FFFFFF'
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${recursive.className} bg-slate-50 scroll-smooth `}>
          <Toaster/> 
           <QueryClientProviderWrapper>
           {children}
           </QueryClientProviderWrapper>
        </body>
    </html>
  );
}
