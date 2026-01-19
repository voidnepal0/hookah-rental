 import { HandIcon } from "../components/icons/HandIcon"
 import { ClockIcon } from "../components/icons/ClockIcon"
 import { VanIcon } from "../components/icons/VanIcon"
 import { WindIcon } from "../components/icons/WindIcon"

export const WhoWeAre = [
    {
        id:1,
        title: "Deep Cleaned",
        description: "Ultrasonic cleaning after every rental",
        icon: <HandIcon className="w-10 h-10" />
    },
    {
        id:2,
        title: "Sealed Safety",
        description: "Disposable hoses and sealed mouthpieces.",
        icon: <ClockIcon className="w-10 h-10" />
    },
    {
        id:3,
        title: "Premium Flavour",
        description: "Only the best and premium flavour only.",
        icon: <VanIcon className="w-10 h-10" />
    },
    {
        id:4,
        title: "ContactLess",
        description: "Safe, secure and private delivery to your.",
        icon: <WindIcon className="w-10 h-10" />
    }
]