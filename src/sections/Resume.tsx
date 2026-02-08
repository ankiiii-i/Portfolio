import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  Briefcase, 
  GraduationCap, 
  Code2,
  Award,
  ExternalLink,
  Eye
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const resumeHighlights = [
  { icon: Briefcase, label: 'Experience', value: '2+ Years' },
  { icon: GraduationCap, label: 'Education', value: 'B.Tech CSE' },
  { icon: Code2, label: 'Projects', value: '4' },
  { icon: Award, label: 'Certifications', value: '2' },
];

const skills = [
  'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python',
  'MongoDB', 'MySQL', 'Express', 'Git', 'REST APIs',
  'HTML/CSS', 'Tailwind', 'Figma', 'Problem Solving'
];

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger actual file download
          const link = document.createElement('a');
          link.href = '/Ankit-Mishra-CV.docx';
          link.download = 'Ankit-Mishra-CV.docx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setTimeout(() => {
            setIsDownloading(false);
            setDownloadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
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
      cardRef.current,
      { opacity: 0, y: 40, rotateX: 15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo(
      highlightsRef.current?.children || [],
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
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7000FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-[#00F0FF]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Get My Resume
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Download <span className="gradient-text">CV</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Resume Preview Card */}
          <div ref={cardRef} className="perspective-1000">
            <div className="glass-card-strong rounded-2xl p-8 relative overflow-hidden group">
              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Ankit Mishra</h3>
                    <p className="text-[#00F0FF]">Full Stack Developer</p>
                  </div>
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">AM</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-[#A0A0B0] text-sm mb-6">
                  Passionate Computer Science student with expertise in full-stack web development.
                  Experienced in building scalable applications using React, Node.js, and modern
                  web technologies.
                </p>

                {/* Skills preview */}
                <div className="mb-6">
                  <p className="text-xs text-[#A0A0B0] uppercase tracking-wider mb-3">Key Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.slice(0, 8).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-xs bg-white/5 rounded text-[#A0A0B0]"
                      >
                        {skill}
                      </span>
                    ))}
                    <span className="px-2 py-1 text-xs bg-white/5 rounded text-[#A0A0B0]">
                      +{skills.length - 8} more
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-2xl font-bold text-white">4</p>
                    <p className="text-xs text-[#A0A0B0]">Projects</p>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <p className="text-2xl font-bold text-white">2+</p>
                    <p className="text-xs text-[#A0A0B0]">Years Exp.</p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                    data-cursor="pointer"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {downloadProgress}%
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Download CV
                      </>
                    )}
                  </button>
                  <a
                    href="/Ankit-Mishra-CV.docx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass px-4 flex items-center justify-center"
                    data-cursor="pointer"
                  >
                    <Eye className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Resume Highlights</h3>
            <div ref={highlightsRef} className="space-y-4">
              {resumeHighlights.map((item) => (
                <div
                  key={item.label}
                  className="glass-card p-4 rounded-xl flex items-center gap-4 group hover:border-[#00F0FF]/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center group-hover:from-[#00F0FF]/30 group-hover:to-[#7000FF]/30 transition-all">
                    <item.icon className="w-6 h-6 text-[#00F0FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#A0A0B0] text-sm">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-8 glass-card p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-[#00F0FF]" />
                <h4 className="text-white font-semibold">File Details</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A0A0B0]">Format</span>
                  <span className="text-white">DOCX</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0B0]">Size</span>
                  <span className="text-white">~25 KB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A0A0B0]">Last Updated</span>
                  <span className="text-white">October 2025</span>
                </div>
              </div>
            </div>

            {/* View online */}
            <a
              href="/Ankit-Mishra-CV.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 text-[#00F0FF] hover:underline"
              data-cursor="pointer"
            >
              <ExternalLink className="w-4 h-4" />
              View resume online
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
