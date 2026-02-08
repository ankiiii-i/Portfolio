import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === document.body) st.kill();
      });
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[100] bg-white/5">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-[#00F0FF]"
        style={{ width: '0%' }}
      />
    </div>
  );
}
