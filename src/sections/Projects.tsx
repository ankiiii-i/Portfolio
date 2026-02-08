import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Business Simulation Platform',
    description: 'An interactive educational platform simulating real-world business operations, inventory management, and revenue modeling.',
    longDescription: 'This comprehensive platform allows users to experience running a virtual business, managing inventory flows, tracking revenue streams, and making strategic decisions. Built with a focus on educational value and user engagement.',
    image: '/project-business-sim.jpg',
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Real-time inventory tracking system',
      'Revenue calculation and forecasting',
      'Interactive dashboard with data visualization',
      'User role management',
      'Responsive design for all devices',
    ],
    contributions: [
      'Designed frontend UI components with React',
      'Developed backend API logic with Node.js',
      'Implemented inventory flow simulation',
      'Created revenue calculation system',
      'Improved application responsiveness',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/ankiiii-i',
    color: 'from-[#00F0FF] to-[#00c8d6]',
  },
  {
    id: 2,
    title: 'Startup Financing Platform',
    description: 'A web application connecting startups with potential investors, featuring secure authentication and financial data visualization.',
    longDescription: 'A comprehensive platform that bridges the gap between innovative startups and potential investors. Features secure authentication, detailed financial analytics, and streamlined communication channels.',
    image: '/project-startup-finance.jpg',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS'],
    features: [
      'Secure user authentication system',
      'Investor-startup matching algorithm',
      'Financial data visualization dashboard',
      'Document management system',
      'Real-time messaging',
    ],
    contributions: [
      'UI design and frontend architecture',
      'Authentication system implementation',
      'Financial data handling modules',
      'Performance optimization',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/ankiiii-i',
    color: 'from-[#7000FF] to-[#9f4fff]',
  },
  {
    id: 3,
    title: 'AI Chatbot Assistant',
    description: 'An intelligent conversational UI integrated into full-stack apps to automate user support and engagement.',
    longDescription: 'A sophisticated AI-powered chatbot that provides intelligent responses and automates customer support. Integrated seamlessly into web applications with natural language processing capabilities.',
    image: '/project-ai-chatbot.jpg',
    tech: ['Python', 'TensorFlow', 'React', 'Node.js', 'NLP'],
    features: [
      'Natural language understanding',
      'Context-aware responses',
      'Multi-platform integration',
      'Learning and adaptation',
      'Analytics dashboard',
    ],
    contributions: [
      'Developed chatbot UI interface',
      'Implemented conversational automation logic',
      'Integrated assistant into full-stack applications',
      'Trained NLP models for better responses',
    ],
    liveUrl: '#',
    githubUrl: 'https://github.com/ankiiii-i',
    color: 'from-[#00F0FF] to-[#7000FF]',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  // 3D tilt effect for cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(cardEl, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardEl: HTMLDivElement) => {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

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
      carouselRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      className="section-container py-24 relative"
    >
      {/* Background effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-[#7000FF]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Project Carousel */}
        <div ref={carouselRef} className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevProject}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 glass-card rounded-full flex items-center justify-center text-white hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all"
            data-cursor="pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 glass-card rounded-full flex items-center justify-center text-white hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-all"
            data-cursor="pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards container */}
          <div className="overflow-hidden px-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div
                    className="perspective-1000"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div
                      className="glass-card-strong rounded-2xl overflow-hidden cursor-pointer group preserve-3d transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,240,255,0.2)]"
                      onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                      onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                      data-cursor="pointer"
                    >
                      {/* Project image */}
                      <div className="h-64 relative overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F16] via-transparent to-transparent" />
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* View project button */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-[#A0A0B0] mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-white/5 rounded-full text-[#A0A0B0]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 4 && (
                            <span className="px-3 py-1 text-xs bg-white/5 rounded-full text-[#A0A0B0]">
                              +{project.tech.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Links */}
                        <div className="flex gap-3">
                          <a
                            href={project.liveUrl}
                            className="flex items-center gap-2 text-sm text-[#00F0FF] hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#A0A0B0] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" />
                            Source Code
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-gradient-to-r from-[#00F0FF] to-[#7000FF]'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                data-cursor="pointer"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-[#0F0F16] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold gradient-text">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-[#A0A0B0]">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>

              <div className="h-48 rounded-lg overflow-hidden my-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">About</h4>
                  <p className="text-[#A0A0B0]">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Key Features</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#A0A0B0]">
                        <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">My Contributions</h4>
                  <ul className="space-y-2">
                    {selectedProject.contributions.map((contrib, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#A0A0B0]">
                        <span className="w-1.5 h-1.5 bg-[#7000FF] rounded-full" />
                        {contrib}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 glass-card rounded-full text-sm text-[#A0A0B0]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <a
                    href={selectedProject.liveUrl}
                    className="btn-primary flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
