import { Metadata } from 'next'
import React from 'react'
import ContacatClient from './ContacatClient'
import ContactForm from '../../components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - Get in Touch for Bookings & Inquiries',
  description: 'Contact Hookah Rental for event bookings, inquiries, and support. Call us or fill out our contact form for fast responses.',
  keywords: [
    'contact hookah rental',
    'hookah rental contact',
    'hookah service contact',
    'event hookah booking',
    'hookah rental phone',
    'hookah service inquiry',
    'contact for hookah events',
    'hookah rental support',
    'book hookah service',
    'hookah event contact',
    'hookah rental customer service',
    'hookah service booking'
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
    canonical: '/contact-us',
  },
  openGraph: {
    title: 'Contact Us - Hookah Rental | Get in Touch for Bookings & Inquiries',
    description: 'Contact Hookah Rental for event bookings, inquiries, and support. Call us or fill out our contact form for fast responses.',
    url: '/contact-us',
    siteName: 'Hookah Rental',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Hookah Rental Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Hookah Rental | Get in Touch for Bookings & Inquiries',
    description: 'Contact Hookah Rental for event bookings, inquiries, and support. Fast responses and professional service.',
    images: ['/twitter-contact.jpg'],
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
        <ContacatClient />
        <ContactForm />
    </main>
  )
}

export default page