"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline } from "animejs";
import { Heart, Sparkles } from "lucide-react";

export default function IntroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [faceExpression, setFaceExpression] = useState<string>("(✿◠‿◠)");
  const [sysStatus, setSysStatus] = useState<string>("Coding...");

  const text = "Hi, I'm John Phillip Febrero Lacorte! I'm a Full Stack Software Engineer. When I'm not tinkering with code or crafting fun pages, I’m usually deep-diving into hardware tuning, modding mechanical keyboards, singing my favorite karaoke hits, or climbing the ranks in competitive gaming. Here’s a quick look into my world.";

  useEffect(() => {
    // Cute bouncy entrance timeline
    const tl = createTimeline();
    
    tl.add(".hero-tag", {
      opacity: [0, 1],
      scale: [0.6, 1],
      rotate: [-10, 0],
      duration: 800,
      easing: "easeOutElastic(1.2, 0.6)",
    })
    .add(".hero-title", {
      opacity: [0, 1],
      translateY: [30, 0],
      scale: [0.95, 1],
      duration: 900,
      easing: "easeOutElastic(1, 0.7)",
    }, "-=600")
    .add(".intro-text", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 800,
      easing: "easeOutBack",
    }, "-=650")
    .add(".hero-btn-group", {
      opacity: [0, 1],
      translateY: [15, 0],
      duration: 800,
      easing: "easeOutBack",
    }, "-=400")
    .add(".computer-pet", {
      opacity: [0, 1],
      scale: [0.7, 1],
      rotate: [10, 0],
      duration: 1000,
      easing: "easeOutElastic(1.2, 0.6)",
    }, "-=700");

    // Toggle cute expressions and status periodically
    const expressions = ["(✿◠‿◠)", "(◕‿◕✿)", "(•‿•)", "(^◡^ )", "(❀◦◡◦)"];
    const statuses = ["Modding Keyboards ⌨️", "Tuning CPU 🍃", "Playing Dota 2 🎮", "Focus Coding ☕", "Chilling 🎵", "Singing Karaoke 🎤"];

    const interval = setInterval(() => {
      const randomExpr = expressions[Math.floor(Math.random() * expressions.length)];
      const randomStat = statuses[Math.floor(Math.random() * statuses.length)];
      
      // Animate face winking or updating
      setFaceExpression("(~◡~ )"); // intermediate wink
      setTimeout(() => {
        setFaceExpression(randomExpr);
        setSysStatus(randomStat);
      }, 200);

      // Bounce the computer pet slightly
      animate(".computer-pet-screen", {
        translateY: [-6, 0],
        scaleY: [0.96, 1],
        duration: 400,
        easing: "easeOutElastic(1.2, 0.4)"
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      id="intro"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-20 overflow-hidden cute-dots"
    >
      {/* Decorative Pastel Background Blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 rounded-full bg-cute-sky/40 blur-[60px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 md:w-80 h-64 md:h-80 rounded-full bg-cute-peach/40 blur-[60px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left Bio Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Cute tag */}
          <div className="hero-tag inline-flex self-start items-center space-x-2 bg-cute-lavender border-2 border-cute-dark rounded-full px-4 py-1.5 font-mono text-xs font-bold text-cute-dark shadow-[2px_2px_0px_#2d2729]">
            <Sparkles size={12} className="animate-spin text-cute-dark" style={{ animationDuration: '4s' }} />
            <span>HELLO WORLD_</span>
          </div>

          <h1 className="hero-title text-4xl md:text-6xl font-extrabold tracking-tight leading-none text-cute-dark">
            Hi, I&apos;m <span className="bg-cute-peach px-3 py-1 rounded-2xl border-2 border-cute-dark inline-block -rotate-2 hover:rotate-0 transition-transform duration-300">John Phillip!</span>
          </h1>

          <h2 className="hero-title text-lg md:text-xl font-bold font-mono tracking-tight text-cute-muted">
            [ Full Stack Software Engineer ] 💻
          </h2>

          <p className="intro-text text-base md:text-lg text-cute-dark font-medium leading-relaxed font-sans max-w-2xl">
            {text}
          </p>

          {/* Buttons group with cute styling */}
          <div className="hero-btn-group flex flex-wrap gap-4 pt-4">
            <a 
              href="#hobbies" 
              className="cute-btn px-6 py-3 bg-cute-mint hover:bg-cute-mint/90 text-cute-dark font-bold tracking-wider text-sm hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729]"
            >
              My Hobbies ✨
            </a>
            <a 
              href="#timeline" 
              className="cute-btn px-6 py-3 bg-cute-sky hover:bg-cute-sky/90 text-cute-dark font-mono text-xs font-bold hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729]"
            >
              /view_timeline 🎒
            </a>
          </div>
        </div>

        {/* Right Column: Retro Macintosh Pet mascot */}
        <div className="lg:col-span-5 w-full flex justify-center items-center">
          <div className="computer-pet w-64 h-72 bg-cute-bg-muted border-[3px] border-cute-dark rounded-3xl p-5 shadow-[6px_6px_0px_#2d2729] flex flex-col justify-between relative group hover:translate-y-[-4px] transition-transform duration-300">
            
            {/* Screen */}
            <div className="computer-pet-screen w-full h-36 bg-[#c4e0e5] border-[2.5px] border-cute-dark rounded-2xl flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-3">
              {/* Scanlines details */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-white/10 opacity-30 pointer-events-none" />
              
              {/* Cute Face */}
              <div className="text-3xl font-mono font-bold text-cute-dark select-none animate-bounce" style={{ animationDuration: '3s' }}>
                {faceExpression}
              </div>

              {/* Status bubble */}
              <div className="absolute bottom-2 text-[9px] font-mono font-semibold uppercase bg-white border border-cute-dark px-2.5 py-0.5 rounded-full shadow-[1px_1px_0px_#2d2729]">
                {sysStatus}
              </div>
            </div>

            {/* Floppy Disk slot */}
            <div className="w-full h-8 bg-white border-2 border-cute-dark rounded-xl flex items-center justify-between px-3 mt-4 relative">
              <div className="w-16 h-1 bg-cute-dark rounded" />
              <div className="flex items-center space-x-1.5">
                <Heart size={10} className="text-cute-peach fill-cute-peach animate-pulse" />
                <span className="font-mono text-[8px] font-bold text-cute-dark uppercase">JOHN_PHILLIP_v2.0</span>
              </div>
            </div>

            {/* Feet */}
            <div className="absolute bottom-[-16px] left-8 w-10 h-4 bg-cute-dark rounded-b-xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)]" />
            <div className="absolute bottom-[-16px] right-8 w-10 h-4 bg-cute-dark rounded-b-xl shadow-[2px_2px_0px_rgba(0,0,0,0.15)]" />

            {/* Sparkling sticker decorations */}
            <div className="absolute -top-4 -left-4 bg-cute-yellow border-2 border-cute-dark rounded-full p-2.5 -rotate-12 shadow-[2px_2px_0px_#2d2729] text-xs font-bold font-mono">
              ⭐
            </div>
            
            <div className="absolute -bottom-2 -right-4 bg-cute-lavender border-2 border-cute-dark rounded-xl px-2.5 py-0.5 rotate-15 shadow-[2px_2px_0px_#2d2729] text-[9px] font-mono font-bold">
              Hi!
            </div>
          </div>
        </div>

      </div>

      {/* Bounce Down Indicator */}
      <div className="absolute bottom-6 flex flex-col items-center justify-center space-y-1 text-cute-muted font-mono text-xs animate-bounce mt-10">
        <span>Scroll to Explore 🌾</span>
        <div className="w-1 h-3 bg-cute-dark rounded" />
      </div>
    </section>
  );
}
