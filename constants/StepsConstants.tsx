 import { HandIcon } from "../components/icons/HandIcon"
 import { ClockIcon } from "../components/icons/ClockIcon"
 import { VanIcon } from "../components/icons/VanIcon"
 import { WindIcon } from "../components/icons/WindIcon"
 
 export const steps = [
    {
      number: "01",
      icon: <HandIcon className="w-10 h-10" />,
      title: "Pick Your Smoke",
      description: "Choose hookah or vape for personal rental, or opt for full hookah catering. From classic setups to premium party vibes, we’ve got you covered."
    },
    {
      number: "02", 
      icon: <ClockIcon className="w-10 h-10"/>,
      title: "Choose Time or event",
      description: "Rent by the hour or by the day for chill sessions, or book catering based on your event size and duration. Flexible plans, no long-term commitment."
    },
    {
      number: "03",
      icon: <VanIcon  className="w-10 h-10"/>,
      title: "We Deliver the Vibe",
      description: "Rentals come with clean, sanitized hookahs ready to smoke. Catering includes setup, flavor management, and full on-site service."
    },
    {
      number: "04",
      icon: <WindIcon className="w-10 h-10"/>,
      title: "Smoke & Chill",
      description: "Enjoy the session or event stress-free. After you’re done, return the rental or let our team pack up everything from the catering setup."
    },
   
  ];