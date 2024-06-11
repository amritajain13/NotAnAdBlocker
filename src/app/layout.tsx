import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="px-0 md:px-16 flex flex-col min-h-screen">
        <ThemeProvider attribute="class">
          <Navbar />
          <div className="flex-grow flex justify-center items-center">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
