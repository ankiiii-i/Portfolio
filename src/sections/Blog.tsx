import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    id: 1,
    title: 'Journey into Web Development',
    excerpt: 'My personal journey from a curious beginner to a passionate full-stack developer, exploring the ever-evolving landscape of modern web technologies.',
    content: `Starting my journey into web development was both exciting and overwhelming. Like many beginners, I started with the basics - HTML and CSS. I remember the thrill of seeing my first "Hello World" page come to life in the browser.

As I progressed, I discovered JavaScript and the endless possibilities it offered. The ability to make web pages interactive was a game-changer. I spent countless hours on online platforms, building small projects and experimenting with different features.

The turning point came when I discovered React. The component-based architecture and the virtual DOM concept fascinated me. I started building more complex applications, learning about state management, props, and hooks along the way.

Today, as a full-stack developer, I continue to learn and grow. The tech landscape is constantly evolving, and there's always something new to explore. My journey has taught me that consistency and curiosity are the keys to success in this field.

For anyone starting their web development journey, my advice is simple: start small, build projects, don't be afraid to make mistakes, and most importantly, enjoy the process of creating something from nothing.`,
    category: 'Career',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    tags: ['Web Dev', 'Career', 'Learning'],
    image: '/blog-journey.jpg',
    color: 'from-[#00F0FF] to-[#00c8d6]',
  },
  {
    id: 2,
    title: 'Lessons from Full-Stack Projects',
    excerpt: 'Key insights and lessons learned from building multiple full-stack applications, from architecture decisions to deployment challenges.',
    content: `Building full-stack applications has been one of the most rewarding experiences in my development career. Each project has taught me valuable lessons that have shaped me into a better developer.

One of the most important lessons I've learned is the value of planning. Before writing a single line of code, it's crucial to understand the requirements, design the database schema, and plan the API endpoints. This upfront investment saves countless hours of refactoring later.

Authentication and security are often overlooked by beginners, but they're critical aspects of any production application. Implementing proper JWT-based authentication, input validation, and protection against common vulnerabilities like SQL injection and XSS attacks is non-negotiable.

Database design is another area where I've learned through experience. Normalization, indexing, and query optimization can make or break an application's performance. Understanding when to use SQL vs NoSQL databases based on the use case is a valuable skill.

Deployment and DevOps were initially intimidating, but tools like Docker, CI/CD pipelines, and cloud platforms have made the process much more manageable. Automating the deployment process not only saves time but also reduces the chances of human error.

Perhaps the most important lesson is that building software is a team sport. Communication, code reviews, and documentation are just as important as writing clean code.`,
    category: 'Technical',
    date: 'Feb 1, 2024',
    readTime: '8 min read',
    tags: ['Full Stack', 'Projects', 'Experience'],
    image: '/blog-projects.jpg',
    color: 'from-[#7000FF] to-[#9f4fff]',
  },
  {
    id: 3,
    title: 'The Power of UI Animation',
    excerpt: 'Why animation matters in modern web design and how it can transform user experience from mundane to memorable.',
    content: `Animation in web design is often seen as a nice-to-have feature, but in reality, it's a powerful tool that can significantly enhance user experience when used correctly.

Good animations serve a purpose. They guide users' attention, provide feedback on interactions, and help users understand the relationships between different elements on the page. Micro-interactions, like button hover effects and loading animations, make the interface feel alive and responsive.

One of the principles I follow is that animations should be subtle and purposeful. Over-the-top animations can be distracting and even annoying. The best animations are those that users barely notice but significantly improve their experience.

Tools like GSAP and Framer Motion have made it easier than ever to create smooth, performant animations. However, it's important to keep performance in mind. Animations that cause layout shifts or excessive repaints can hurt the user experience instead of improving it.

Scroll-based animations have become increasingly popular, and for good reason. They create a narrative experience as users scroll through a page, revealing content in a visually engaging way. Libraries like GSAP's ScrollTrigger make implementing these effects straightforward.

Accessibility is another important consideration. Not all users appreciate or can handle animations. Providing options to reduce motion and ensuring that animations don't interfere with screen readers is essential for inclusive design.

In conclusion, animation is a powerful tool in a developer's arsenal. When used thoughtfully, it can transform a good user interface into a great one.`,
    category: 'Design',
    date: 'Feb 10, 2024',
    readTime: '6 min read',
    tags: ['UI/UX', 'Animation', 'Design'],
    image: '/blog-animation.jpg',
    color: 'from-[#00F0FF] to-[#7000FF]',
  },
  {
    id: 4,
    title: 'Future Learning Roadmap',
    excerpt: 'My plans for continued growth as a developer, including new technologies to master and skills to develop.',
    content: `The tech industry moves at a breakneck pace, and staying relevant requires continuous learning. As I look ahead, I've outlined a roadmap for my future growth as a developer.

In the short term, I plan to deepen my expertise in the technologies I already work with. This includes advanced React patterns, performance optimization techniques, and diving deeper into Node.js internals. Understanding how things work under the hood makes you a better developer.

TypeScript has become the industry standard, and I want to achieve mastery in it. Beyond basic type annotations, I want to explore advanced features like generics, conditional types, and type guards. The goal is to write type-safe code that catches errors at compile time.

Cloud technologies are becoming increasingly important, and I plan to get hands-on experience with AWS or Azure. Understanding serverless architecture, containerization with Docker and Kubernetes, and CI/CD pipelines will be valuable additions to my skill set.

I'm also excited about the potential of AI and machine learning in web development. While I don't plan to become an ML engineer, understanding how to integrate AI services into web applications will be a valuable skill.

Soft skills are equally important. I want to improve my technical writing, presentation skills, and ability to mentor others. Being able to communicate complex technical concepts clearly is a superpower in itself.

The journey of learning never ends, and I'm excited about what the future holds. The key is to stay curious, embrace challenges, and never stop building.`,
    category: 'Planning',
    date: 'Feb 20, 2024',
    readTime: '4 min read',
    tags: ['Learning', 'Roadmap', 'Growth'],
    image: '/blog-roadmap.jpg',
    color: 'from-[#00c8d6] to-[#7000FF]',
  },
];

const categories = ['All', 'Career', 'Technical', 'Design', 'Planning'];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
      filterRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      cardsRef.current?.children || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
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

      <div className="max-w-6xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-12">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Knowledge Hub
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Blog</span>
          </h2>
        </div>

        {/* Search and Filter */}
        <div ref={filterRef} className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A0A0B0]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass-card rounded-xl text-white placeholder-[#A0A0B0] focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#7000FF] text-white'
                    : 'glass-card text-[#A0A0B0] hover:text-white'
                }`}
                data-cursor="pointer"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-card rounded-2xl overflow-hidden group hover:border-[#00F0FF]/30 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPost(post)}
              data-cursor="pointer"
            >
              {/* Card header with image */}
              <div className="h-40 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F16] via-[#0F0F16]/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F0FF] transition-colors">
                  {post.title}
                </h3>
                <p className="text-[#A0A0B0] text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-[#A0A0B0] mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-white/5 rounded text-[#A0A0B0]"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read more */}
                <div className="flex items-center gap-2 text-[#00F0FF] text-sm font-medium group-hover:gap-3 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#A0A0B0]">No articles found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Blog Article Modal */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl bg-[#0F0F16] border-white/10 text-white max-h-[90vh] overflow-y-auto">
          {selectedPost && (
            <>
              <DialogHeader>
                <div className="h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#00F0FF]/20 rounded-full text-xs text-[#00F0FF]">
                    {selectedPost.category}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold gradient-text">
                  {selectedPost.title}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-[#A0A0B0]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedPost.readTime}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1.5 glass-card rounded-full text-sm text-[#A0A0B0]"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Article content */}
                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-[#A0A0B0] leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
