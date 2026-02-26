import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://northboundstudio.co'),
  title: 'Northbound Studio - AI-Powered Digital Agency',
  description: 'Next-generation digital agency specializing in AI-powered applications, intelligent automation, and custom web development. We build intelligent digital solutions.',
  manifest: '/manifest.json',
  openGraph: {
    title: 'Northbound Studio - AI-Powered Digital Agency',
    description: 'Building the future of digital experiences through AI and intelligent automation.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Northbound Studio - AI-Powered Digital Agency',
    description: 'Building the future of digital experiences through AI and intelligent automation.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QJD26X3N7Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QJD26X3N7Y');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
