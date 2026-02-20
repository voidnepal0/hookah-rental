import RentalsClient from "./rentalsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Premium Hookahs for Events & Parties | Book Now",
  description:
    "Browse our premium hookah collection for rent. Perfect for events, parties, and special occasions. Professional delivery, setup, and premium flavors included.",
  keywords: [
    "hookah rentals",
    "rent hookah",
    "hookah for events",
    "party hookah rental",
    "event hookah service",
    "hookah delivery",
    "premium hookah rental",
    "hookah flavors",
    "hookah setup service",
    "hookah rental packages",
    "wedding hookah rental",
    "corporate event hookah",
    "birthday party hookah",
  ],
  authors: [{ name: "Hookah Rental" }],
  creator: "Hookah Rental",
  publisher: "Hookah Rental",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://hookah-rental.com",
  ),
  alternates: {
    canonical: "/rentals",
  },
  openGraph: {
    title: "Hookah Rentals - Premium Hookahs for Events & Parties | Book Now",
    description:
      "Browse our premium hookah collection for rent. Perfect for events, parties, and special occasions. Professional delivery, setup, and premium flavors included.",
    url: "/rentals",
    siteName: "Hookah Rental",
    images: [
      {
        url: "/og-rentals.jpg",
        width: 1200,
        height: 630,
        alt: "Premium Hookah Rentals Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hookah Rentals - Premium Hookahs for Events & Parties | Book Now",
    description:
      "Browse our premium hookah collection for rent. Perfect for events, parties, and special occasions. Professional delivery and setup included.",
    images: ["/twitter-rentals.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const page = () => {
  return <RentalsClient />;
};

export default page;
