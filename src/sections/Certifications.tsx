import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, ExternalLink, CheckCircle, Trophy, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    id: 1,
    title: 'Data Structures and Algorithms',
    provider: 'Coursera',
    date: 'June 2025',
    description: 'Comprehensive course covering fundamental data structures, algorithms, and problem-solving techniques.',
    skills: ['Arrays', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming'],
    image: '/cert-dsa.jpg',
    color: 'from-[#00F0FF] to-[#00c8d6]',
    icon: Trophy,
  },
  {
    id: 2,
    title: 'Full Stack Web Development Bootcamp',
    provider: 'Udemy',
    date: 'July 2025',
    description: 'Intensive bootcamp covering modern web development from frontend to backend with real-world projects.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
    image: '/cert-fullstack.jpg',
    color: 'from-[#7000FF] to-[#9f4fff]',
    icon: Star,
  },
];

const achievements = [
  { title: 'Hackathon Winner', description: 'Won 1st place in university hackathon' },
  { title: 'Dean\'s List', description: 'Academic excellence recognition' },
  { title: 'Open Source Contributor', description: 'Active contributor to 5+ projects' },
  { title: 'Coding Streak', description: '45+ days of consistent coding' },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

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
      cardsRef.current?.children || [],
      { opacity: 0, y: 40, rotateY: -30 },
      { opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      achievementsRef.current?.children || [],
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
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
            Credentials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Certifications <span className="gradient-text">& Achievements</span>
          </h2>
        </div>

        {/* Certification Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="perspective-1000 h-80"
              onMouseEnter={() => setFlippedCard(cert.id)}
              onMouseLeave={() => setFlippedCard(null)}
            >
              <div
                className={`relative w-full h-full preserve-3d transition-transform duration-700 ${
                  flippedCard === cert.id ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: flippedCard === cert.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className={`h-full glass-card-strong rounded-2xl overflow-hidden relative`}>
                    {/* Certificate image */}
                    <div className="h-40 relative overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F16] via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-5 h-5 text-[#00F0FF]" />
                        <span className="text-[#A0A0B0] text-sm">{cert.provider}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                      <div className="flex items-center gap-2 text-[#A0A0B0] text-sm mb-4">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                      </div>
                      <p className="text-[#A0A0B0] text-sm line-clamp-2">{cert.description}</p>

                      {/* Hover hint */}
                      <div className="absolute bottom-4 right-4 text-[#00F0FF] text-xs flex items-center gap-1">
                        <span>Hover to flip</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="h-full glass-card-strong rounded-2xl p-6 flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-4">Skills Acquired</h4>
                    <div className="flex-1">
                      <ul className="space-y-3">
                        {cert.skills.map((skill) => (
                          <li key={skill} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#00F0FF]" />
                            <span className="text-[#A0A0B0]">{skill}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="btn-primary w-full mt-4 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white">
            Other <span className="gradient-text">Achievements</span>
          </h3>
        </div>

        <div ref={achievementsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className="glass-card p-6 rounded-2xl text-center group hover:border-[#00F0FF]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center group-hover:from-[#00F0FF]/30 group-hover:to-[#7000FF]/30 transition-all">
                <Trophy className="w-6 h-6 text-[#00F0FF]" />
              </div>
              <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
              <p className="text-[#A0A0B0] text-sm">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
