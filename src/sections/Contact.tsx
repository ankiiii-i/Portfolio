import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: Github, href: 'https://github.com/ankiiii-i', label: 'GitHub', color: '#00F0FF' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ankitmishra00', label: 'LinkedIn', color: '#7000FF' },
  { icon: Twitter, href: '#', label: 'Twitter', color: '#00c8d6' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Using Formspree for form submission
      const response = await fetch('https://formspree.io/f/amsm6883@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Fallback: Open mailto link
        const subject = encodeURIComponent(`Message from ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
        window.open(`mailto:amsm6883@gmail.com?subject=${subject}&body=${body}`, '_blank');
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      // Fallback: Open mailto link
      const subject = encodeURIComponent(`Message from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.open(`mailto:amsm6883@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
    
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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
      formRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo(
      socialsRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)' },
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
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#7000FF]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Contact <span className="gradient-text">Me</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card-strong rounded-2xl p-8 relative overflow-hidden"
          >
            {/* Success overlay */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-[#0F0F16]/95 backdrop-blur-xl flex flex-col items-center justify-center z-10 animate-in fade-in duration-300">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-[#A0A0B0] text-center mb-6">
                  Thank you for reaching out. I'll get back to you soon!
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary"
                  data-cursor="pointer"
                >
                  Send Another Message
                </button>
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

            {/* Name field */}
            <div className="mb-6 relative">
              <label className="block text-sm text-[#A0A0B0] mb-2">Your Name</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                    errors.name
                      ? 'border-red-500'
                      : focusedField === 'name'
                      ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'border-white/10'
                  }`}
                />
                {focusedField === 'name' && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
                )}
              </div>
              {errors.name && (
                <p className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email field */}
            <div className="mb-6 relative">
              <label className="block text-sm text-[#A0A0B0] mb-2">Your Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 ${
                    errors.email
                      ? 'border-red-500'
                      : focusedField === 'email'
                      ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'border-white/10'
                  }`}
                />
                {focusedField === 'email' && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
                )}
              </div>
              {errors.email && (
                <p className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message field */}
            <div className="mb-6 relative">
              <label className="block text-sm text-[#A0A0B0] mb-2">Your Message</label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Tell me about your project..."
                  rows={4}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none transition-all duration-300 resize-none ${
                    errors.message
                      ? 'border-red-500'
                      : focusedField === 'message'
                      ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'border-white/10'
                  }`}
                />
                {focusedField === 'message' && (
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#00F0FF] to-[#7000FF]" />
                )}
              </div>
              {errors.message && (
                <p className="flex items-center gap-1 text-red-400 text-sm mt-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
              data-cursor="pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div ref={infoRef}>
            {/* Availability status */}
            <div className="glass-card p-6 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
                </div>
                <div>
                  <p className="text-white font-semibold">Available for work</p>
                  <p className="text-[#A0A0B0] text-sm">Open to freelance & full-time opportunities</p>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-4 mb-8">
              <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-[#A0A0B0] text-sm">Email</p>
                  <a
                    href="mailto:amsm6883@gmail.com"
                    className="text-white hover:text-[#00F0FF] transition-colors"
                  >
                    amsm6883@gmail.com
                  </a>
                </div>
              </div>

              <div className="glass-card p-4 rounded-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-[#A0A0B0] text-sm">Location</p>
                  <p className="text-white">Hyderabad, India</p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-[#A0A0B0] text-sm mb-4 uppercase tracking-wider">Connect With Me</p>
              <div ref={socialsRef} className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 glass-card rounded-xl flex items-center justify-center group hover:border-[#00F0FF]/50 transition-all duration-300"
                    style={{
                      boxShadow: `0 0 0 ${social.color}00`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 20px ${social.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = `0 0 0 ${social.color}00`;
                    }}
                    data-cursor="pointer"
                    aria-label={social.label}
                  >
                    <social.icon
                      className="w-6 h-6 transition-colors"
                      style={{ color: social.color }}
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick response promise */}
            <div className="mt-8 glass-card p-4 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <p className="text-[#A0A0B0] text-sm">
                  I typically respond within <span className="text-white">24 hours</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
