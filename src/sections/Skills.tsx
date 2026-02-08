import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    name: 'Programming',
    skills: [
      { name: 'JavaScript', level: 90 },
      { name: 'Python', level: 75 },
      { name: 'C', level: 70 },
      { name: 'C++', level: 65 },
    ],
  },
  {
    name: 'Web Development',
    skills: [
      { name: 'React', level: 92 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 82 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'REST APIs', level: 88 },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 78 },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 88 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 82 },
      { name: 'Figma', level: 70 },
    ],
  },
  {
    name: 'Soft Skills',
    skills: [
      { name: 'Problem Solving', level: 90 },
      { name: 'Team Collaboration', level: 88 },
      { name: 'Communication', level: 85 },
      { name: 'Time Management', level: 82 },
      { name: 'Adaptability', level: 87 },
    ],
  },
];

const radarData = [
  { subject: 'Frontend', A: 92, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Database', A: 79, fullMark: 100 },
  { subject: 'UI/UX', A: 75, fullMark: 100 },
  { subject: 'DevOps', A: 65, fullMark: 100 },
  { subject: 'Mobile', A: 60, fullMark: 100 },
];

// Tech icons for the 3D sphere
const techIcons = [
  'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'MongoDB', 'MySQL', 'Git', 'HTML5', 'CSS3',
  'Express', 'Figma', 'GitHub', 'VS Code', 'Postman',
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  // 3D sphere rotation
  useEffect(() => {
    const sphere = sphereRef.current;
    if (!sphere) return;

    let rotation = 0;
    let animationId: number;

    const animate = () => {
      rotation += 0.2;
      if (sphere) {
        sphere.style.transform = `rotateY(${rotation}deg) rotateX(${rotation * 0.3}deg)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
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

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    tl.fromTo(
      sphereRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo(
      chartRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      categoriesRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  // Generate sphere positions
  const getSpherePositions = () => {
    const positions: { x: number; y: number; z: number; icon: string }[] = [];
    const radius = 150;
    
    techIcons.forEach((icon, i) => {
      const phi = Math.acos(-1 + (2 * i) / techIcons.length);
      const theta = Math.sqrt(techIcons.length * Math.PI) * phi;
      
      positions.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        icon,
      });
    });
    
    return positions;
  };

  const spherePositions = getSpherePositions();

  return (
    <section
      ref={sectionRef}
      className="section-container py-24 relative"
    >
      {/* Background effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7000FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            What I Do
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* 3D Skill Sphere */}
          <div className="flex justify-center perspective-1000">
            <div
              ref={sphereRef}
              className="relative w-[300px] h-[300px] preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {spherePositions.map((pos, i) => (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 glass-card px-3 py-2 rounded-lg text-xs font-medium text-white whitespace-nowrap transition-all duration-300 hover:scale-125 hover:z-10 cursor-pointer"
                  style={{
                    transform: `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`,
                    opacity: (pos.z + 150) / 300 + 0.3,
                  }}

                >
                  {pos.icon}
                </div>
              ))}
              
              {/* Center glow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-[#00F0FF]/30 to-[#7000FF]/30 rounded-full blur-xl" />
            </div>
          </div>

          {/* Radar Chart */}
          <div ref={chartRef} className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Skill Proficiency</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#A0A0B0', fontSize: 12 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#00F0FF"
                  strokeWidth={2}
                  fill="#00F0FF"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Categories */}
          <div ref={categoriesRef} className="space-y-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skillCategories.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(i)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === i
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white'
                      : 'glass-card text-[#A0A0B0] hover:text-white'
                  }`}
                  data-cursor="pointer"
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active category skills */}
            <div className="space-y-4">
              {skillCategories[activeCategory].skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-[#00F0FF]">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill cloud */}
        <div className="mt-16 flex flex-wrap justify-center gap-3">
          {[
            'React', 'Node.js', 'Express', 'MongoDB', 'MySQL',
            'JavaScript', 'TypeScript', 'Python', 'Git', 'GitHub',
            'HTML5', 'CSS3', 'Tailwind', 'REST API', 'Figma',
          ].map((skill, i) => (
            <span
              key={skill}
              className="px-4 py-2 glass-card rounded-full text-sm text-[#A0A0B0] hover:text-white hover:border-[#00F0FF]/50 transition-all duration-300 cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
