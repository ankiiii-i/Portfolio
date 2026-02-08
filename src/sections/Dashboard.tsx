import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Layers,
  Code2,
  TrendingUp,
  Calendar,
  Target,
  Zap,
  Award,
  Clock,
  GitCommit,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Simulated data
const commitData = [
  { day: 'Mon', commits: 12 },
  { day: 'Tue', commits: 19 },
  { day: 'Wed', commits: 15 },
  { day: 'Thu', commits: 25 },
  { day: 'Fri', commits: 22 },
  { day: 'Sat', commits: 8 },
  { day: 'Sun', commits: 5 },
];

const skillGrowthData = [
  { month: 'Jan', frontend: 60, backend: 45, database: 40 },
  { month: 'Feb', frontend: 65, backend: 50, database: 45 },
  { month: 'Mar', frontend: 70, backend: 55, database: 50 },
  { month: 'Apr', frontend: 75, backend: 60, database: 55 },
  { month: 'May', frontend: 80, backend: 70, database: 60 },
  { month: 'Jun', frontend: 85, backend: 75, database: 65 },
  { month: 'Jul', frontend: 90, backend: 80, database: 70 },
  { month: 'Aug', frontend: 92, backend: 85, database: 75 },
];

const techUsageData = [
  { name: 'JavaScript', value: 35, color: '#00F0FF' },
  { name: 'React', value: 25, color: '#7000FF' },
  { name: 'Node.js', value: 20, color: '#00c8d6' },
  { name: 'Python', value: 15, color: '#9f4fff' },
  { name: 'Other', value: 5, color: '#A0A0B0' },
];

const heatmapData = Array.from({ length: 52 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    week,
    day,
    value: Math.floor(Math.random() * 5),
  }))
);

const stats = [
  { icon: Clock, label: 'Hours Coded', value: '850', change: '+15%' },
  { icon: Code2, label: 'Lines of Code', value: '45.2K', change: '+8%' },
  { icon: Layers, label: 'Projects Completed', value: '4', change: '+1' },
  { icon: TrendingUp, label: 'Coding Streak', value: '45 days', change: 'Best!' },
];

export default function Dashboard() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

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
      statsRef.current?.children || [],
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.4)' },
      '-=0.4'
    );

    tl.fromTo(
      chartsRef.current?.children || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
      '-=0.3'
    );

    // Animate stats numbers
    stats.forEach((stat, i) => {
      const numValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
      gsap.to({}, {
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          const progress = this.progress();
          setAnimatedStats(prev => {
            const newStats = [...prev];
            newStats[i] = Math.floor(numValue * progress);
            return newStats;
          });
        },
      });
    });

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

      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <span className="text-[#00F0FF] text-sm tracking-[0.3em] uppercase mb-4 block">
            Developer Analytics
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            My <span className="gradient-text">Dashboard</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-2xl group hover:border-[#00F0FF]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center group-hover:from-[#00F0FF]/30 group-hover:to-[#7000FF]/30 transition-all">
                  <stat.icon className="w-6 h-6 text-[#00F0FF]" />
                </div>
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-400' : 'text-[#00F0FF]'}`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                {stat.value.includes('K') 
                  ? `${(animatedStats[i] / 1000).toFixed(1)}K`
                  : stat.value.includes('days')
                  ? `${animatedStats[i]} days`
                  : animatedStats[i].toLocaleString()}
              </p>
              <p className="text-[#A0A0B0] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div ref={chartsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Weekly Commits */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <GitCommit className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-lg font-semibold text-white">Weekly Commits</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={commitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" tick={{ fill: '#A0A0B0', fontSize: 12 }} />
                <YAxis tick={{ fill: '#A0A0B0', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F16',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="commits" fill="#00F0FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Growth */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-lg font-semibold text-white">Skill Growth</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={skillGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" tick={{ fill: '#A0A0B0', fontSize: 12 }} />
                <YAxis tick={{ fill: '#A0A0B0', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F16',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="frontend" stackId="1" stroke="#00F0FF" fill="#00F0FF" fillOpacity={0.3} />
                <Area type="monotone" dataKey="backend" stackId="1" stroke="#7000FF" fill="#7000FF" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Tech Usage */}
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-lg font-semibold text-white">Tech Usage</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={techUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {techUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F0F16',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-2 justify-center">
              {techUsageData.map((tech) => (
                <div key={tech.name} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tech.color }} />
                  <span className="text-xs text-[#A0A0B0]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub-style Contribution Heatmap */}
        <div className="glass-card p-6 rounded-2xl mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="text-lg font-semibold text-white">Contribution Activity</h3>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#A0A0B0]">
              <span>Less</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 rounded-sm bg-white/5" />
                <span className="w-3 h-3 rounded-sm bg-[#00F0FF]/30" />
                <span className="w-3 h-3 rounded-sm bg-[#00F0FF]/50" />
                <span className="w-3 h-3 rounded-sm bg-[#00F0FF]/70" />
                <span className="w-3 h-3 rounded-sm bg-[#00F0FF]" />
              </div>
              <span>More</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className="w-3 h-3 rounded-sm transition-all duration-300 hover:scale-125"
                      style={{
                        backgroundColor: day.value === 0 
                          ? 'rgba(255,255,255,0.05)' 
                          : `rgba(0, 240, 255, ${day.value * 0.25})`,
                      }}
                      title={`${day.value} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {[
            { icon: Target, label: 'Certification Progress', value: 75, total: '2/3 Certs' },
            { icon: Zap, label: 'Technology Adoption', value: 82, total: '12 Techs' },
            { icon: Award, label: 'Learning Consistency', value: 90, total: '45 Days' },
          ].map((item) => (
            <div key={item.label} className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00F0FF]/20 to-[#7000FF]/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <div>
                  <p className="text-white font-medium">{item.label}</p>
                  <p className="text-[#A0A0B0] text-sm">{item.total}</p>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#7000FF] rounded-full transition-all duration-1000"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <p className="text-right text-[#00F0FF] text-sm mt-2">{item.value}%</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
