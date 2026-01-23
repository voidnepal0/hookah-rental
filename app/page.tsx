import { Metadata } from 'next'
import Collection from "../components/Home/Collection";
import Hero from "../components/Home/Hero";
import HowItWorks from "../components/Home/HowItWorks";
import Reviews from "../components/Home/Reviews";
import WhySmoke from "../components/Home/WhySmoke";

export const metadata: Metadata = {
  title: 'Hookah Rental - Premium Hookahs for Events & Parties',
  description: 'Rent high-quality hookahs for your events, parties, and special occasions. Professional hookah rental service with delivery, setup, and premium flavors.',
  keywords: [
    'hookah rental',
    'hookah for events',
    'party hookah rental',
    'hookah service',
    'rent hookah',
    'hookah delivery',
    'event hookah',
    'premium hookah',
    'hookah flavors',
    'hookah setup'
  ],
  authors: [{ name: 'Hookah Rental' }],
  creator: 'Hookah Rental',
  publisher: 'Hookah Rental',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hookah-rental.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hookah Rental - Premium Hookahs for Events & Parties',
    description: 'Rent high-quality hookahs for your events, parties, and special occasions. Professional hookah rental service with delivery, setup, and premium flavors.',
    url: '/',
    siteName: 'Hookah Rental',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hookah Rental Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hookah Rental - Premium Hookahs for Events & Parties',
    description: 'Rent high-quality hookahs for your events, parties, and special occasions. Professional hookah rental service with delivery, setup, and premium flavors.',
    images: ['/twitter-image.jpg'],
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function Home() {
  return (
   <main>
    <Hero />
    <Collection />
    <HowItWorks />
    <WhySmoke />
    <Reviews />
   </main>
  );
}
