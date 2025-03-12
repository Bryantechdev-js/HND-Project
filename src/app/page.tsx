// import { HeroSection } from "@/components/hero-section";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import FeatureSection from "@/components/FeatureSection";
import MailInterface from "@/components/MailInterface";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
// import { SparklesCore } from "@/components/ui/sparkles"


export default function Home() {
  return (
    <div className="">
      <Navbar/>
       <Hero/>
       <FeatureSection/>
       <MailInterface/>
       <Testimonials/>
       <FAQSection/>
       <Footer/>
    </div>
  );
}
