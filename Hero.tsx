import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Lottie from 'lottie-react';
import dementiaCareAnimation from '../video/Main-Scene.json'; // Adjust path if needed

interface HeroProps {
  isDarkMode: boolean;
}

const Hero: React.FC<HeroProps> = ({ isDarkMode }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isDarkMode) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isDarkMode]);

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text and Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6">
              AI for <span className="text-primary-600 dark:text-primary-400">Dementia Care</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Empowering caregivers with AI-powered insights to provide better care for dementia patients.
              Transform the way you support your loved ones.
            </p>
            <motion.a
              href="#cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>

          {/* Right Side: Lottie Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full flex justify-center"
          >
            <Lottie
              animationData={dementiaCareAnimation}
              loop
              autoplay
              className="w-full max-w-xl sm:max-w-2xl lg:max-w-3xl"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;