import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Monitor, 
  Sparkles, 
  Palette, 
  Layers, 
  Zap,
  ArrowRight,
  Cpu,
  Globe
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const interests = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Crafting beautiful, responsive user interfaces with modern frameworks like React, Vue, and Next.js. Focused on performance and accessibility.',
    icon: Monitor,
    color: '#00F0FF',
    skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'UI Animation',
    description: 'Bringing interfaces to life with smooth, meaningful animations using GSAP, Framer Motion, and CSS transitions.',
    icon: Sparkles,
    color: '#7000FF',
    skills: ['GSAP', 'Framer Motion', 'CSS Animations', 'Lottie', 'Three.js'],
  },
  {
    id: 3,
    title: 'Interactive Web Design',
    description: 'Creating immersive web experiences with 3D elements, particle effects, and scroll-based animations.',
    icon: Palette,
    color: '#00c8d6',
    skills: ['WebGL', 'Three.js', 'Canvas API', 'SVG Animation', 'ScrollTrigger'],
  },
  {
    id: 4,
    title: 'Full Stack Development',
    description: 'Building end-to-end applications with robust backends, databases, and seamless frontend integration.',
    icon: Layers,
    color: '#9f4fff',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    id: 5,
    title: 'System Architecture',
    description: 'Designing scalable, maintainable system architectures that can grow with business needs.',
    icon: Cpu,
    color: '#00F0FF',
    skills: ['Microservices', 'Docker', 'AWS', 'CI/CD', 'System Design'],
  },
  {
    id: 6,
    title: 'Open Source',
    description: 'Contributing to the developer community through open source projects and knowledge sharing.',
    icon: Globe,
    color: '#7000FF',
    skills: ['Git', 'GitHub', 'Documentation', 'Code Review', 'Community'],
  },
];

export default function Interests() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(
      gridRef.current?.children || [],
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
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
      {/* Background effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-[#7000FF]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            What Drives Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Specializations</span>
          </h2>
        </div>

        {/* Interests Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-500 ${
                expandedCard === interest.id
                  ? 'border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.2)]'
                  : 'hover:border-white/20'
              }`}
              onClick={() => setExpandedCard(expandedCard === interest.id ? null : interest.id)}
              data-cursor="pointer"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${interest.color}20, ${interest.color}10)`,
                  boxShadow: expandedCard === interest.id ? `0 0 20px ${interest.color}40` : 'none',
                }}
              >
                <interest.icon
                  className="w-7 h-7 transition-colors"
                  style={{ color: interest.color }}
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                {interest.title}
              </h3>

              {/* Description */}
              <p className="text-[#A0A0B0] text-sm mb-4">
                {interest.description}
              </p>

              {/* Expandable content */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  expandedCard === interest.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-[#A0A0B0] mb-2 uppercase tracking-wider">Key Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {interest.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          background: `${interest.color}20`,
                          color: interest.color,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expand indicator */}
              <div className="flex items-center gap-2 mt-4 text-sm">
                <span
                  className="transition-colors"
                  style={{ color: interest.color }}
                >
                  {expandedCard === interest.id ? 'Show Less' : 'Learn More'}
                </span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform duration-300 ${
                    expandedCard === interest.id ? 'rotate-90' : ''
                  }`}
                  style={{ color: interest.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-[#A0A0B0] mb-4">
            Interested in collaborating or have a project in mind?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 btn-primary"
            data-cursor="pointer"
          >
            <Zap className="w-5 h-5" />
            Let's Connect
          </a>
        </div>
      </div>
    </section>
  );
}
