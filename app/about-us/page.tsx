import { Metadata } from 'next'
import React from 'react'
import AboutUs from './AboutClient'
import Experience from '../../components/about/Experience'
import WhoAreWe from '../../components/about/WhoAreWe'
import TeamQuote from '../../components/about/TeamQuote'

export const metadata: Metadata = {
  title: 'About Us - Hookah Rental | Our Story & Team',
  description: 'Learn about Hookah Rental - our story, experienced team, and commitment to providing premium hookah services for events and parties.',
  keywords: [
    'about hookah rental',
    'hookah rental team',
    'hookah service company',
    'hookah rental story',
    'professional hookah service',
    'hookah experts',
    'event hookah company',
    'hookah rental experience',
    'hookah team',
    'about our hookah service'
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
    canonical: '/about-us',
  },
  openGraph: {
    title: 'About Us - Hookah Rental | Our Story & Team',
    description: 'Learn about Hookah Rental - our story, experienced team, and commitment to providing premium hookah services for events and parties.',
    url: '/about-us',
    siteName: 'Hookah Rental',
    images: [
      {
        url: '/og-about-us.jpg',
        width: 1200,
        height: 630,
        alt: 'About Hookah Rental Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Hookah Rental | Our Story & Team',
    description: 'Learn about Hookah Rental - our story, experienced team, and commitment to providing premium hookah services.',
    images: ['/twitter-about-us.jpg'],
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
}

const page = () => {
  return (
    <main>
      <AboutUs />
      <Experience />
      <WhoAreWe />
      <TeamQuote />
    </main>
  )
}

export default page