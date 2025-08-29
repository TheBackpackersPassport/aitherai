import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AitherAI - Create Without Limits | Custom Website Development",
  description: "We create completely custom websites tailored to your business. No templates, no generic builders, no limitations - just your vision brought to life through cutting-edge AI-powered development.",
  keywords: "custom website development, AI-powered web development, bespoke websites, no templates, professional web design",
  icons: {
    icon: [
      // ICO first to ensure best compatibility and aspect ratio in many browsers
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#14B8A6' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "AitherAI - Create Without Limits",
    description: "Completely custom websites with AI-powered development. No Squarespace, No WordPress, No Wix.",
    type: "website",
    url: "https://aitherai.com",
  },
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
