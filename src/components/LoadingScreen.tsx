import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate progress
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setProgress(Math.round(progressObj.value));
      },
    });

    // Animate progress bar
    tl.to(progressRef.current, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
    });

    // Text glitch effect
    const glitchTexts = ['INITIALIZING...', 'LOADING ASSETS...', 'COMPILING...', 'READY'];
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
      if (textRef.current && textIndex < glitchTexts.length) {
        textRef.current.textContent = glitchTexts[textIndex];
        textIndex++;
      }
    }, 500);

    // Complete animation
    tl.to(circleRef.current, {
      scale: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power4.in',
      delay: 0.3,
    });

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        clearInterval(textInterval);
        onComplete();
      },
    });

    return () => {
      clearInterval(textInterval);
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#05050A] flex flex-col items-center justify-center"
    >
      {/* Animated Circle */}
      <div
        ref={circleRef}
        className="relative w-32 h-32 mb-8"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#00F0FF]/30 animate-pulse" />
        
        {/* Middle ring */}
        <div className="absolute inset-2 rounded-full border-2 border-[#7000FF]/50" 
          style={{ animation: 'spin 3s linear infinite' }} 
        />
        
        {/* Inner ring */}
        <div className="absolute inset-4 rounded-full border-2 border-[#00F0FF]/70"
          style={{ animation: 'spin-reverse 2s linear infinite' }}
        />
        
        {/* Center glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#7000FF] animate-pulse-glow" />
        
        {/* Progress number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">{progress}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF]"
          style={{ width: '0%' }}
        />
      </div>

      {/* Glitch Text */}
      <div
        ref={textRef}
        className="text-[#00F0FF] font-mono text-sm tracking-[0.3em]"
      >
        INITIALIZING...
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-[#00F0FF]/20 rounded-lg rotate-45" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-[#7000FF]/20 rounded-lg -rotate-45" />
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-[#7000FF] rounded-full animate-pulse" />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
