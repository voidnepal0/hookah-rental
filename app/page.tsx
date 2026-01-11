import Collection from "./components/Home/Collection";
import Hero from "./components/Home/Hero";
import HowItWorks from "./components/Home/HowItWorks";
import WhySmoke from "./components/Home/WhySmoke";



export default function Home() {
  return (
   <main>
    <Hero />
    <Collection />
    <HowItWorks />
    <WhySmoke />
   </main>
  );
}
