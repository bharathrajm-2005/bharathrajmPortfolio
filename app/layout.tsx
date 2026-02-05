import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bharath Raj M - CSE Student | Android & Web Developer",
  description: "Pre-final year CSE student specializing in Android and Web development with strong foundation in DSA. Passionate about building real-world solutions.",
  keywords: ["Bharath Raj", "CSE Student", "Android Developer", "Web Developer", "DSA", "Portfolio", "Chennai"],
  authors: [{ name: "Bharath Raj M" }],
  openGraph: {
    title: "Bharath Raj M - Portfolio",
    description: "Pre-final year CSE student | Android & Web Developer | DSA Enthusiast",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
