import { Metadata } from 'next'
import CateringClient from './cateringCLient'
import ClinetSay from '../../components/catering/ClinetSay'
import Catering from '../../components/catering/Cater'
import Planning from '@/components/catering/Planning'

export const metadata: Metadata = {
  title: 'Hookah Catering Services | Professional Event Hookah Service',
  description: 'Professional hookah catering services for events, weddings, and parties. Book your hookah catering service today.',
  keywords: [
    'hookah catering',
    'hookah event service',
    'hookah party catering',
    'wedding hookah service',
    'corporate hookah catering',
    'event hookah rental',
    'hookah bar service',
    'mobile hookah service',
    'hookah catering packages',
    'professional hookah service',
    'hookah event staff',
    'hookah party setup'
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
    canonical: '/catering',
  },
  openGraph: {
    title: 'Hookah Catering Services | Professional Event Hookah Service',
    description: 'Professional hookah catering services for events, weddings, and parties. Complete setup, premium flavors, and experienced staff.',
    url: '/catering',
    siteName: 'Hookah Rental',
    images: [
      {
        url: '/og-catering.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Hookah Catering Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hookah Catering Services | Professional Event Hookah Service',
    description: 'Professional hookah catering services for events, weddings, and parties. Complete setup and experienced staff included.',
    images: ['/twitter-catering.jpg'],
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

const CateringPage = () => {
  return (
    <>
      <CateringClient />
      <ClinetSay />
      <Catering />
      <Planning />
    </>
  )
}

export default CateringPage
