import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AitherAI - Create Without Limits | Custom Website Development",
  description: "We create completely custom websites tailored to your business. No templates, no generic builders, no limitations - just your vision brought to life through cutting-edge AI-powered development.",
  keywords: "custom website development, AI-powered web development, bespoke websites, no templates, professional web design",
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "AitherAI - Create Without Limits",
    description: "Completely custom websites with AI-powered development. No Squarespace, No WordPress, No Wix.",
    type: "website",
    url: "https://aitherai.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
