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
  title: "FlowOps Systems | Build. Automate. Flow.",
  description: "Enterprise-grade automation systems, AI workflows, and digital infrastructure for ambitious businesses.",
  keywords: "automation, AI workflows, systems engineering, digital infrastructure, business automation",
  authors: [{ name: "FlowOps Systems" }],
  openGraph: {
    title: "FlowOps Systems | Build. Automate. Flow.",
    description: "Enterprise-grade automation systems, AI workflows, and digital infrastructure for ambitious businesses.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
