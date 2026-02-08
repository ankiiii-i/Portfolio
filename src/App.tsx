import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Sections
import LoadingScreen from './components/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Dashboard from './sections/Dashboard';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Blog from './sections/Blog';
import Interests from './sections/Interests';
import Resume from './sections/Resume';
import Contact from './sections/Contact';

// Components
import NavigationDock from './components/NavigationDock';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import StarfieldBackground from './components/StarfieldBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);

  // Check for touch device
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setCursorEnabled(!isTouchDevice);
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-[#05050A] overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      {cursorEnabled && <CustomCursor />}

      {/* Starfield Background */}
      <StarfieldBackground />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Navigation Dock */}
      {!isLoading && <NavigationDock />}

      {/* Main Content */}
      <main ref={mainRef} className="relative z-10">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="dashboard">
          <Dashboard />
        </section>
        
        <section id="education">
          <Education />
        </section>
        
        <section id="certifications">
          <Certifications />
        </section>
        
        <section id="blog">
          <Blog />
        </section>
        
        <section id="interests">
          <Interests />
        </section>
        
        <section id="resume">
          <Resume />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>

      {/* Global Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] grid-bg opacity-50" />
      
      {/* Radial Glow */}
      <div className="fixed inset-0 pointer-events-none z-[6] radial-glow" />
    </div>
  );
}

export default App;
