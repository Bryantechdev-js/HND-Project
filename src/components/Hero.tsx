// Ensure the Hero component is exported as default
import { motion } from 'framer-motion'
import { RippleButton } from './magicui/ripple-button';
import { TypingAnimation } from './magicui/typing-animation';
import { InteractiveGridPattern } from './magicui/interactive-grid-pattern';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="w-full dark:bg-[#121212] h-screen bg-center flex flex-col md:flex-row justify-center md:justify-between items-center px-6 md:px-20 py-6 md:py-0 bg-slate-100" id='hero'>
        
    <div className="TextContainer space-y-6 md:space-y-10 text-center md:text-left">
        <TypingAnimation/>
      <p className="text-base md:text-lg">
        Fast, secure, and reliable communication <br />
        MaxMail is designed to keep your inbox streamlined and your productivity soaring.
      </p>
      <Link href="/stripe">
      <RippleButton />
      </Link>
    </div>
  
    <div className="imageContainer max-md:w-full mt-6 md:mt-0">
      {/* Replace "img" with an actual image */}
      <img
        src="/istockphoto-2162068555-1024x1024.jpg"
        alt="MaxMail"
        width={100}
        height={100}
        className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      />
    </div>
  </section>
  
  )
}

// Ensure it's a default export
export default Hero;
