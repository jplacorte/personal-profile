"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Clock, Play, Pause, BookOpen, GraduationCap, School } from "lucide-react";

const eras = [
  {
    id: "elementary",
    title: "Elementary Days",
    subtitle: "The Spark ✨",
    emoji: "🎒",
    vibe: "Pure curiosity, internet computer shops, & PSP gaming.",
    story: "This is where my love for technology began! Between school projects and discovering my very first video games, I became completely fascinated by computers and how digital worlds worked. Sitting in computer shops, watching hardware operate, and typing commands created the spark. During these days, I watched shows like Pokémon, Slam Dunk, Yu-Gi-Oh!, Naruto, and Dragon Ball Z on TV. I also loved music and frequently tuned into the MYX channel to catch my favorite songs, including \"In the End\" by Linkin Park, \"Down\" by Jay Sean, \"One Time\" by Justin Bieber, \"Fireflies\" by Owl City, \"Because of You\" by Ne-Yo, \"With You\" by Chris Brown, \"Where Is the Love?\" by The Black Eyed Peas, and \"Thunder\" and \"Love Drunk\" by Boys Like Girls. I also played my first story-rich RPGs and action games like Final Fantasy I, Final Fantasy Tactics: The War of the Lions, Star Ocean: First Departure, and God of War, as well as fighting games like Dissidia, Dissidia Duodecim, Tekken, and Naruto: Ultimate Ninja Heroes—all on a PSP console that my father bought for me. When I wasn't gaming, I also started playing basketball with my cousins.",
    tags: ["Computer Shops 🖥️", "PSP Gaming 🎮", "Pure Curiosity 💡"],
    icon: BookOpen,
    color: "bg-cute-peach",
    accentColor: "#ffb2a7"
  },
  {
    id: "highschool",
    title: "High School Days",
    subtitle: "Down the Rabbit Hole 🐰",
    emoji: "🏫",
    vibe: "Competitive gaming, hardware assembly, & tech discovery.",
    story: "High school was all about diving deeper into the competitive gaming scene. I was hooked on League of Legends, and I always looked forward to going home so I could play right away. I also started watching anime series like Attack on Titan, Sword Art Online, and Haikyu!!. Outside of school and gaming, I was active in our local parish, serving as an altar server (altar boy) and singing in the church choir. I also joined the Senior Scouts, which allowed me to travel to different places for Scout Jamborees. Along the way, I began caring about frame rates, understanding PC components, and realizing that I was incredibly curious and wanted to learn more about how computers work, rather than just playing and using them.",
    tags: ["League of Legends 🎮", "Parish Service ⛪", "Tech Curiosity 💡"],
    icon: School,
    color: "bg-cute-sky",
    accentColor: "#bfe3ff"
  },
  {
    id: "college",
    title: "College Days",
    subtitle: "Building the Foundation 🎓",
    emoji: "🎓",
    vibe: "Late-night coding sessions, full-stack projects, & coding growth.",
    story: "Formalizing my passion by diving headfirst into software development! I was just an average student who wanted to graduate on time, but college became a blur of learning programming languages, data structures, and architecting my first projects. Alongside formal classes, I did a lot of self-studying and learned how to code from my talented classmates. With a limited allowance, I learned how to budget my money, and I grew to enjoy traveling despite the long three-hour commute from our house to the city that would sometimes extend by an extra 30 minutes—meaning I only went home during vacations or long weekends. Navigating those trips on my own turned these years into a journey of both personal independence and professional craft.",
    tags: ["Algorithms 💻", "Full-Stack Web 🌐", "Architecture 🏛️"],
    icon: GraduationCap,
    color: "bg-cute-lavender",
    accentColor: "#d8bffd"
  }
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Timeline States
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndexRef = useRef(activeIndex);
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const changePage = (nextIndex: number) => {
    if (nextIndex === activeIndexRef.current || isAnimating) return;
    setIsAnimating(true);

    // Animate page OUT (slide out to the left and fade out)
    animate(".cute-notebook-page", {
      translateX: [0, -30],
      opacity: [1, 0],
      scale: [1, 0.98],
      duration: 250,
      easing: "easeInQuad"
    }).then(() => {
      // Once hidden, update activeIndex state
      setActiveIndex(nextIndex);

      // Animate page IN (slide in from the right and fade in)
      animate(".cute-notebook-page", {
        translateX: [30, 0],
        opacity: [0, 1],
        scale: [0.98, 1],
        duration: 350,
        easing: "easeOutBack"
      }).then(() => {
        setIsAnimating(false);
      });
    });

    // Tactile wobble animation for the background layers
    animate(".cute-notebook-back-1", {
      rotate: [1, 2, 1],
      scale: [1, 0.99, 1],
      duration: 600,
      easing: "easeOutElastic(1.1, 0.7)"
    });
    animate(".cute-notebook-back-2", {
      rotate: [-1, -2, -1],
      scale: [1, 0.99, 1],
      duration: 600,
      easing: "easeOutElastic(1.1, 0.7)"
    });
  };

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      autoplayTimerRef.current = setInterval(() => {
        const nextIndex = (activeIndexRef.current + 1) % eras.length;
        changePage(nextIndex);
      }, 6500);
    } else {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    }

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Entrance animation for page on first load
  useEffect(() => {
    animate(".cute-notebook-page", {
      translateY: [20, 0],
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: 600,
      easing: "easeOutBack"
    });
  }, []);

  useEffect(() => {
    // 1. Connector line
    const progressBar = document.querySelector(".cute-timeline-progress") as HTMLElement;
    if (progressBar) {
      const percentage = (activeIndex / (eras.length - 1)) * 100;
      animate(progressBar, {
        width: `${percentage}%`,
        backgroundColor: eras[activeIndex].accentColor,
        duration: 500,
        easing: "easeOutQuad"
      });
    }

    // 2. Dot selectors
    animate(".cute-timeline-dot", {
      scale: (_: unknown, i: number) => i === activeIndex ? 1.3 : 1.0,
      backgroundColor: (_: unknown, i: number) => i === activeIndex ? eras[i].accentColor : "#ffffff",
      borderColor: "#2d2729",
      boxShadow: (_: unknown, i: number) => i === activeIndex ? "3px 3px 0px #2d2729" : "1px 1px 0px #2d2729",
      duration: 500,
      easing: "easeOutElastic(1.2, 0.6)"
    });
  }, [activeIndex]);

  // Entrance scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".cute-timeline-stagger", {
              opacity: [0, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(120),
              easing: "easeOutElastic(1.1, 0.75)"
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleDotClick = (index: number) => {
    setIsPlaying(false); // Pause autoplay
    changePage(index);
  };

  return (
    <section 
      ref={sectionRef}
      id="timeline" 
      className="py-24 px-4 md:px-8 bg-cute-bg relative overflow-hidden cute-grid"
    >
      <div className="max-w-4xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-cute-dark tracking-tight">
            My Journey Timeline 🎒
          </h2>
          <p className="text-cute-muted max-w-xl mx-auto font-mono text-xs md:text-sm uppercase tracking-widest">
            {"// A short story of my life"}
          </p>
        </div>

        {/* Progress track */}
        <div className="mb-16 relative cute-timeline-stagger px-4">
          {/* Main Track connecting line */}
          <div className="absolute top-1/2 left-4 right-4 h-1 border-t-4 border-dashed border-cute-dark/20 -translate-y-1/2" />
          
          {/* Active progress */}
          <div 
            className="cute-timeline-progress absolute top-1/2 left-4 h-1 bg-cute-peach -translate-y-1/2 transition-all duration-300"
            style={{ width: "0%" }}
          />

          {/* Dots */}
          <div className="flex justify-between items-center relative z-10">
            {eras.map((era, index) => {
              const IconComp = era.icon;
              return (
                <div key={era.id} className="flex flex-col items-center">
                  <button
                    onClick={() => handleDotClick(index)}
                    className="cute-timeline-dot w-8 h-8 rounded-full border-2 border-cute-dark bg-white flex items-center justify-center cursor-pointer transition-all clickable shadow-[2px_2px_0px_#2d2729]"
                  >
                    <IconComp size={12} className="text-cute-dark font-bold pointer-events-none" />
                  </button>
                  <span 
                    onClick={() => handleDotClick(index)}
                    className={`mt-3 font-mono text-[9px] md:text-xs tracking-wider uppercase cursor-pointer select-none font-bold transition-colors duration-300 clickable ${index === activeIndex ? "text-cute-dark" : "text-cute-muted"}`}
                  >
                    {era.title.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Play control */}
        <div className="flex justify-center items-center space-x-4 mb-8 cute-timeline-stagger font-mono text-xs text-cute-muted">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="cute-btn flex items-center space-x-2 px-4 py-1.5 bg-white text-cute-dark font-bold shadow-[2px_2px_0px_#2d2729] hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] clickable"
          >
            {isPlaying ? (
              <>
                <Pause size={12} className="text-cute-peach" />
                <span>Autoplay: On 🍃</span>
              </>
            ) : (
              <>
                <Play size={12} className="text-cute-muted" />
                <span>Autoplay: Paused ☕</span>
              </>
            )}
          </button>
          <span className="text-cute-dark/20">|</span>
          <span className="flex items-center space-x-1.5 font-bold font-mono">
            <Clock size={12} />
            <span>Cycle: 6.5s</span>
          </span>
        </div>

        {/* Timeline Notebook Page stack */}
        <div 
          className="max-w-xl mx-auto relative mt-8 px-4 md:px-0"
          style={{ perspective: "1000px" }}
        >
          {/* Stacked pages behind active page */}
          <div className="cute-notebook-back-1 absolute inset-0 bg-white border-2 border-cute-dark rounded-3xl rotate-1 translate-y-1.5 translate-x-1 shadow-[3px_3px_0px_#2d2729] opacity-75" />
          <div className="cute-notebook-back-2 absolute inset-0 bg-white border-2 border-cute-dark rounded-3xl -rotate-1 -translate-y-1 translate-x-0.5 shadow-[1.5px_1.5px_0px_#2d2729] opacity-90" />
          
          {/* Active Page Card */}
          <div className="cute-notebook-page relative bg-white border-2 border-cute-dark rounded-3xl shadow-[6px_6px_0px_#2d2729] pl-12 pr-6 py-6 md:pl-16 md:pr-8 md:py-8 overflow-visible flex flex-col justify-between min-h-[400px]">
            {/* Top red margin indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-[22px] ${eras[activeIndex].color}`} />
            
            {/* Ruled paper red vertical margin line */}
            <div className="absolute left-10 md:left-14 top-0 bottom-0 w-[1.5px] bg-red-400/40 pointer-events-none" />

            {/* Spiral Binder Rings on the left */}
            <div className="absolute left-2 md:left-3 top-8 bottom-8 flex flex-col justify-between w-6 pointer-events-none z-30">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex items-center h-4">
                  {/* Paper hole */}
                  <div className="w-1.5 h-1.5 rounded-full bg-cute-bg-muted border border-cute-dark/25 shadow-inner" />
                  {/* Wire ring */}
                  <div className="w-4 h-2.5 rounded-full border border-cute-dark bg-slate-200 -ml-0.5 shadow-sm" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-3xl mr-2 select-none">{eras[activeIndex].emoji}</span>
                  <h3 className="text-lg md:text-xl font-bold text-cute-dark font-sans inline-block align-middle leading-none">
                    {eras[activeIndex].title}
                  </h3>
                  <div className="text-[9px] font-mono font-bold uppercase tracking-wider text-cute-muted mt-1">
                    {eras[activeIndex].subtitle}
                  </div>
                </div>
                
                <span className={`px-2.5 py-1 border border-cute-dark rounded-full font-mono text-[9px] font-bold text-cute-dark ${eras[activeIndex].color} shadow-[1.5px_1.5px_0px_#2d2729]`}>
                  ERA {activeIndex + 1}
                </span>
              </div>

              <p className="text-xs text-cute-muted font-bold font-sans mb-4 leading-relaxed italic">
                &ldquo;{eras[activeIndex].vibe}&rdquo;
              </p>

              <p className="text-xs text-cute-dark font-medium leading-relaxed border-t border-dashed border-cute-dark/10 pt-4 font-sans">
                {eras[activeIndex].story}
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mt-6 border-t border-dashed border-cute-dark/15 pt-4">
              {eras[activeIndex].tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-2 py-0.5 rounded-full bg-cute-bg border border-cute-dark text-[9px] font-mono font-bold text-cute-dark shadow-[1px_1px_0px_#2d2729]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Tabs for desktop */}
            <div className="absolute -right-12 top-10 hidden md:flex flex-col gap-2 z-10">
              {eras.map((era, index) => (
                <button
                  key={era.id}
                  onClick={() => handleDotClick(index)}
                  className={`px-3 py-1.5 rounded-r-xl border border-l-0 border-cute-dark font-mono text-[9px] font-bold uppercase tracking-wider text-cute-dark transition-all clickable shadow-[2px_2px_0px_#2d2729] ${era.color} ${
                    index === activeIndex 
                      ? "translate-x-1 font-extrabold pr-4" 
                      : "hover:translate-x-0.5 opacity-80"
                  }`}
                  style={{ transform: index === activeIndex ? 'translateX(4px)' : 'none' }}
                >
                  {era.id.replace("school", "")}
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
