import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Traction from './components/Traction';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhyTheGap from './components/whygap';
import WorldMap from './components/worldmap';
function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('darkMode');
    return stored === 'true';
  });

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleDarkMode = () => {
    const newState = !isDarkMode;
    setIsDarkMode(newState);
    localStorage.setItem('darkMode', newState.toString());
    document.documentElement.classList.toggle('dark', newState);
  };

  const handlePlayVideo = () => {
    setShowVideo(true);
    // Explicitly play the video after showing it
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.warn('Video play failed:', e));
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    if (videoRef.current) {
      if (showVideo) {
        videoRef.current.play().catch((e) => console.warn('Video play failed:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [showVideo]);

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className={`fixed top-0 left-0 w-full h-full object-cover z-[-1] transition-opacity duration-700 ${
          showVideo ? 'opacity-100' : 'opacity-0'
        }`}
        src="/video/q.mp4"  // Ensure video is in the correct path
        muted
        loop
        playsInline
      />

      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handlePlayVideo={handlePlayVideo}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <section id="home">
            <Hero isDarkMode={isDarkMode} />
          </section>
          <section id="problem">
            <Problem />
          </section>
          <WhyTheGap />
          <WorldMap />
          <section id="solution">
            <Solution />
          </section>
          <section id="traction">
            <Traction />
          </section>
          <section id="cta">
            <CTA />
          </section>
        </AnimatePresence>
      </main>

      <Footer />
      
    </div>
  );
}

export default App;