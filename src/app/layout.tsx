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
  title: "I'm Lazy - Font & Color Palette Generator | Design Tools",
  description: "Generate random Google Fonts and color palettes instantly. Create monochromatic, complementary, analogous, and triadic color schemes. Save and manage your favorite fonts and palettes. Perfect for designers, developers, and creatives.",
  keywords: [
    "font generator",
    "color palette generator", 
    "Google Fonts",
    "design tools",
    "typography",
    "color theory",
    "monochromatic colors",
    "complementary colors",
    "analogous colors",
    "triadic colors",
    "web design",
    "graphic design",
    "creative tools",
    "font pairing",
    "color harmony"
  ],
  authors: [{ name: "I'm Lazy Design Tools" }],
  creator: "I'm Lazy Design Tools",
  publisher: "I'm Lazy Design Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://im-lazy.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "I'm Lazy - Font & Color Palette Generator",
    description: "Generate random Google Fonts and color palettes instantly. Create beautiful color schemes with monochromatic, complementary, analogous, and triadic harmonies.",
    url: 'https://im-lazy.vercel.app',
    siteName: "I'm Lazy Design Tools",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "I'm Lazy Font and Color Palette Generator",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "I'm Lazy - Font & Color Palette Generator",
    description: "Generate random Google Fonts and color palettes instantly. Perfect for designers and developers.",
    images: ['/og-image.jpg'],
    creator: '@imlazy_design',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#374151" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="I'm Lazy" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
