import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, GraduationCap, Briefcase, Phone, Mail, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const personalInfo = [
  { icon: User, label: 'Name', value: 'Ankit Mishra' },
  { icon: Calendar, label: 'Birthday', value: 'November 25, 2004' },
  { icon: GraduationCap, label: 'Degree', value: 'B.Tech (CSE)' },
  { icon: Briefcase, label: 'Experience', value: '2+ Years' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
  { icon: Mail, label: 'Email', value: 'ankitmishracr72020@gmail.com' },
  { icon: MapPin, label: 'City', value: 'Hyderabad, India' },
  { icon: CheckCircle, label: 'Freelance', value: 'Available' },
];

function User({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect for profile card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll animations
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Title animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    // Card animation
    tl.fromTo(
      cardRef.current,
      { opacity: 0, x: -100, rotateY: -30 },
      { opacity: 1, x: 0, rotateY: 0, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    // Text animation
    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.6'
    );

    // Grid items stagger
    tl.fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.4)' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container py-24 relative"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#7000FF]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Get To Know Me
          </span>
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Card */}
          <div className="perspective-1000 flex justify-center lg:justify-start">
            <div
              ref={cardRef}
              className="relative w-80 h-96 preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00F0FF]/30 to-[#7000FF]/30 rounded-3xl blur-2xl opacity-50" />
              
              {/* Main card */}
              <div className="relative w-full h-full glass-card-strong rounded-3xl overflow-hidden scanlines">
                {/* Profile image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center border-2 border-[#00F0FF]/30">
                    <span className="text-6xl font-bold gradient-text">AM</span>
                  </div>
                </div>
                
                {/* Holographic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent" />
                
                {/* Scanlines */}
                <div className="absolute inset-0 opacity-30">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-px bg-[#00F0FF]/20"
                      style={{ marginTop: `${i * 5}%` }}
                    />
                  ))}
                </div>
                
                {/* Info at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Ankit Mishra</h3>
                  <p className="text-[#00F0FF] text-sm">Full Stack Developer</p>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#00F0FF]/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#00F0FF]/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#00F0FF]/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00F0FF]/50" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <p ref={textRef} className="text-lg text-[#A0A0B0] leading-relaxed">
              I'm a passionate <span className="text-white font-semibold">Computer Science student</span> at 
              Lovely Professional University, driven by the challenge of building scalable web applications. 
              With a strong foundation in both frontend aesthetics and backend logic, I transform complex 
              problems into elegant, user-centric solutions.
            </p>
            
            <p className="text-lg text-[#A0A0B0] leading-relaxed">
              My journey in tech started with a curiosity about how things work, which evolved into a 
              deep passion for creating immersive digital experiences. I specialize in{' '}
              <span className="text-[#00F0FF]">React</span>,{' '}
              <span className="text-[#00F0FF]">Node.js</span>, and modern web technologies, 
              always staying at the forefront of innovation.
            </p>

            {/* Info Grid */}
            <div ref={gridRef} className="grid grid-cols-2 gap-4">
              {personalInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="glass-card p-4 rounded-xl group hover:border-[#00F0FF]/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center group-hover:from-[#00F0FF]/30 group-hover:to-[#7000FF]/30 transition-all">
                      <Icon className="w-5 h-5 text-[#00F0FF]" />
                    </div>
                    <div>
                      <p className="text-[#A0A0B0] text-xs uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
