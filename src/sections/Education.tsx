import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: 1,
    institution: 'Lovely Professional University',
    degree: 'B.Tech Computer Science and Engineering',
    period: '2022 - 2026',
    location: 'Punjab, India',
    score: 'CGPA: 7.61',
    status: 'Currently Studying',
    focus: ['Web Development', 'System Design', 'Programming Logic', 'Data Structures'],
    icon: GraduationCap,
    side: 'left',
  },
  {
    id: 2,
    institution: 'Narayana Junior College',
    degree: 'Intermediate Education',
    period: '2020 - 2022',
    location: 'Hyderabad, India',
    score: 'CGPA: 10',
    status: 'Completed',
    focus: ['Mathematics', 'Physics', 'Chemistry'],
    icon: BookOpen,
    side: 'right',
  },
  {
    id: 3,
    institution: 'Krishnaveni High School',
    degree: 'Secondary School Education',
    period: '2018 - 2020',
    location: 'Hyderabad, India',
    score: 'Score: 86%',
    status: 'Completed',
    focus: ['Science', 'Mathematics', 'Computer Basics'],
    icon: Award,
    side: 'left',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

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

    // Timeline line draw animation
    tl.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: 'top' },
      { scaleY: 1, duration: 1.5, ease: 'power2.out' },
      '-=0.4'
    );

    // Timeline items stagger
    const items = timelineRef.current?.querySelectorAll('.timeline-item');
    if (items) {
      tl.fromTo(
        items,
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out' },
        '-=1'
      );
    }

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
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7000FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Academic Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Education</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Center line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00F0FF] via-[#7000FF] to-[#00F0FF] -translate-x-1/2 hidden md:block"
          />

          {/* Mobile line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#00F0FF] via-[#7000FF] to-[#00F0FF] md:hidden" />

          {/* Timeline items */}
          <div className="space-y-12">
            {educationData.map((edu) => (
              <div
                key={edu.id}
                className={`timeline-item relative grid md:grid-cols-2 gap-8 ${
                  edu.side === 'right' ? 'md:text-left' : 'md:text-right'
                }`}
              >
                {/* Content */}
                <div
                  className={`${edu.side === 'right' ? 'md:order-2' : 'md:order-1'} pl-12 md:pl-0`}
                >
                  <div
                    className={`glass-card p-6 rounded-2xl hover:border-[#00F0FF]/30 transition-all duration-300 group ${
                      edu.side === 'right' ? 'md:ml-8' : 'md:mr-8'
                    }`}
                  >
                    {/* Institution */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                      {edu.institution}
                    </h3>

                    {/* Degree */}
                    <p className="text-[#A0A0B0] mb-4">{edu.degree}</p>

                    {/* Details */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span className="flex items-center gap-1 text-[#A0A0B0]">
                        <Calendar className="w-4 h-4 text-[#00F0FF]" />
                        {edu.period}
                      </span>
                      <span className="flex items-center gap-1 text-[#A0A0B0]">
                        <MapPin className="w-4 h-4 text-[#00F0FF]" />
                        {edu.location}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#00F0FF]/20 to-[#7000FF]/20 rounded-full mb-4">
                      <Award className="w-4 h-4 text-[#00F0FF]" />
                      <span className="text-sm font-medium text-white">{edu.score}</span>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          edu.status === 'Currently Studying'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-[#00F0FF]/20 text-[#00F0FF]'
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>

                    {/* Focus areas */}
                    <div className="flex flex-wrap gap-2">
                      {edu.focus.map((area) => (
                        <span
                          key={area}
                          className="px-2 py-1 text-xs bg-white/5 rounded text-[#A0A0B0]"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Center node */}
                <div
                  className={`absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 ${
                    edu.side === 'right' ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <div className="relative">
                    {/* Glow */}
                    <div className="absolute inset-0 bg-[#00F0FF] rounded-full blur-lg opacity-50" />
                    {/* Node */}
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#00F0FF] to-[#7000FF] flex items-center justify-center">
                      <edu.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden md:block ${edu.side === 'right' ? 'md:order-1' : 'md:order-2'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
