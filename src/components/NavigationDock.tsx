import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  BarChart3, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Lightbulb, 
  FileText, 
  Mail 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Code2, label: 'Skills' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'certifications', icon: Award, label: 'Certs' },
  { id: 'blog', icon: BookOpen, label: 'Blog' },
  { id: 'interests', icon: Lightbulb, label: 'Interests' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function NavigationDock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show dock after scrolling past hero
    ScrollTrigger.create({
      trigger: '#about',
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    // Track active section
    navItems.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(id),
        onEnterBack: () => setActiveSection(id),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={dockRef}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="glass-card-strong px-4 py-3 flex items-center gap-2">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id;
          
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative group p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20'
                  : 'hover:bg-white/5'
              }`}
              data-cursor="pointer"
            >
              <Icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isActive ? 'text-[#00F0FF]' : 'text-white/60 group-hover:text-white'
                }`}
              />
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#0F0F16] border border-white/10 rounded-lg text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#00F0FF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
