import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Send, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'Problem Solver',
  'Tech Innovator',
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const role = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && displayText === role) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      } else {
        setDisplayText(
          isDeleting 
            ? role.substring(0, displayText.length - 1)
            : role.substring(0, displayText.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Greeting fade in
    tl.fromTo(
      greetingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Name reveal with stagger
    tl.fromTo(
      nameRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    );

    // Role typing container
    tl.fromTo(
      roleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );

    // Social icons
    tl.fromTo(
      socialsRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.2'
    );

    // Scroll-triggered exit animation
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(sectionRef.current, {
          opacity: 1 - progress * 1.5,
          scale: 1 + progress * 0.2,
          y: -progress * 100,
          duration: 0.1,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container min-h-screen relative overflow-hidden"
    >
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7000FF]/5 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-[#00F0FF]/50 to-transparent" />
        <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-[#7000FF]/50 to-transparent" />
        <div className="absolute bottom-1/3 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/50 to-transparent" />
      </div>

      <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
        {/* Greeting */}
        <div ref={greetingRef} className="mb-4">
          <span className="text-[#A0A0B0] text-lg md:text-xl tracking-[0.3em] uppercase">
            Hello, I'm
          </span>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
        >
          <span className="text-white">ANKIT</span>{' '}
          <span className="gradient-text">MISHRA</span>
        </h1>

        {/* Role with typing effect */}
        <div ref={roleRef} className="mb-10 h-12">
          <span className="text-xl md:text-2xl lg:text-3xl text-[#A0A0B0]">
            I'm a{' '}
            <span className="text-[#00F0FF] font-semibold">
              {displayText}
            </span>
            <span className="animate-pulse">|</span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#resume"
            className="btn-primary inline-flex items-center justify-center gap-2 group"
            data-cursor="pointer"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="btn-glass inline-flex items-center justify-center gap-2 group"
            data-cursor="pointer"
          >
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Get in Touch
          </a>
        </div>

        {/* Social Links */}
        <div ref={socialsRef} className="flex justify-center gap-4">
          {[
            { icon: Github, href: 'https://github.com/ankiiii-i', label: 'GitHub' },
            { icon: Linkedin, href: 'https://linkedin.com/in/ankitmishra00', label: 'LinkedIn' },
            { icon: Twitter, href: '#', label: 'Twitter' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all duration-300 group"
              data-cursor="pointer"
              aria-label={label}
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[#A0A0B0] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1 h-2 bg-[#00F0FF] rounded-full animate-bounce" />
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-10 left-10 w-20 h-px bg-gradient-to-r from-[#00F0FF] to-transparent" />
      <div className="absolute top-10 left-10 w-px h-20 bg-gradient-to-b from-[#00F0FF] to-transparent" />
      <div className="absolute top-10 right-10 w-20 h-px bg-gradient-to-l from-[#7000FF] to-transparent" />
      <div className="absolute top-10 right-10 w-px h-20 bg-gradient-to-b from-[#7000FF] to-transparent" />
      <div className="absolute bottom-10 left-10 w-20 h-px bg-gradient-to-r from-[#7000FF] to-transparent" />
      <div className="absolute bottom-10 left-10 w-px h-20 bg-gradient-to-t from-[#7000FF] to-transparent" />
      <div className="absolute bottom-10 right-10 w-20 h-px bg-gradient-to-l from-[#00F0FF] to-transparent" />
      <div className="absolute bottom-10 right-10 w-px h-20 bg-gradient-to-t from-[#00F0FF] to-transparent" />
    </section>
  );
}
