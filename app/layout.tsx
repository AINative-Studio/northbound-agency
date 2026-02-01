import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://blaq.ainative.studio'),
  title: 'Blaq Digital - AI-Native Digital Media Agency',
  description: 'Next-generation digital media and AI agency built at the intersection of entertainment, artificial intelligence, and Black culture. We build intelligent media systems.',
  openGraph: {
    title: 'Blaq Digital - AI-Native Digital Media Agency',
    description: 'Building the future of media, entertainment, and culture through intelligent systems.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blaq Digital - AI-Native Digital Media Agency',
    description: 'Building the future of media, entertainment, and culture through intelligent systems.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
