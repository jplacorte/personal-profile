"use client";

import { useState, useEffect } from "react";
import CustomCursor from "@/components/CustomCursor";
import IntroSection from "@/components/IntroSection";
import HobbiesSection from "@/components/HobbiesSection";
import MediaSection from "@/components/MediaSection";
import TimelineSection from "@/components/TimelineSection";
import { Menu, X, Cpu, Heart, Code2 } from "lucide-react";
import { animate } from "animejs";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Soft springy fade-in on mount
  useEffect(() => {
    animate(".page-wrapper", {
      opacity: [0, 1],
      scale: [0.98, 1],
      duration: 800,
      easing: "easeOutBack"
    });
  }, []);

  return (
    <>
      {/* Dynamic Cute Spring Cursor */}
      <CustomCursor />

      <div className="page-wrapper min-h-screen bg-cute-bg flex flex-col overflow-x-hidden font-sans text-cute-dark selection:bg-cute-peach/40 selection:text-cute-dark">

      {/* STICKY HEADER - Floating Pill shape */}
      <header 
        className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 px-4`}
      >
        <div 
          className={`max-w-4xl mx-auto rounded-full border-2 border-cute-dark bg-white flex justify-between items-center transition-all duration-300 ${
            scrolled 
              ? "py-2 px-4 md:px-6 shadow-[3px_3px_0px_#2d2729]" 
              : "py-3 px-5 md:px-8 shadow-[2px_2px_0px_#2d2729]"
          }`}
        >
          {/* Logo / System Indicator */}
          <a href="#intro" className="flex items-center space-x-2 font-mono text-xs tracking-widest font-extrabold text-cute-dark hover:text-cute-peach transition-colors clickable">
            <Cpu size={14} className="text-cute-peach animate-pulse" />
            <span>John Phillip // <span className="text-cute-peach">SYS ⚡</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-xs font-mono tracking-wider uppercase font-bold">
            <a href="#intro" className="text-cute-muted hover:text-cute-peach transition-colors clickable">/intro</a>
            <a href="#hobbies" className="text-cute-muted hover:text-cute-peach transition-colors clickable">/hobbies</a>
            <a href="#media" className="text-cute-muted hover:text-cute-peach transition-colors clickable">/media</a>
            <a href="#timeline" className="text-cute-muted hover:text-cute-peach transition-colors clickable">/timeline</a>
          </nav>

          {/* Status Badge */}
          <div className="hidden md:flex items-center space-x-1.5 bg-cute-bg-muted border border-cute-dark rounded-full px-3 py-1 font-mono text-[9px] font-bold text-cute-dark shadow-[1px_1px_0px_#2d2729]">
            <span className="w-1.5 h-1.5 rounded-full bg-cute-mint animate-pulse" />
            <span>ONLINE 🍃</span>
          </div>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-1 text-cute-dark hover:text-cute-peach transition-all clickable"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-35 bg-white/95 backdrop-blur-md flex flex-col justify-center items-center gap-8 text-lg font-mono font-bold transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full invisible pointer-events-none"
        }`}
      >
        {/* Close button inside mobile menu */}
        <button 
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 p-2 border-2 border-cute-dark rounded-full bg-white shadow-[2px_2px_0px_#2d2729] clickable"
        >
          <X size={20} />
        </button>

        <a 
          href="#intro" 
          onClick={() => setMenuOpen(false)} 
          className="text-cute-dark hover:text-cute-peach transition-colors clickable"
        >
          [ INTRO 🧸 ]
        </a>
        <a 
          href="#hobbies" 
          onClick={() => setMenuOpen(false)} 
          className="text-cute-dark hover:text-cute-peach transition-colors clickable"
        >
          [ HOBBIES ✨ ]
        </a>
        <a 
          href="#media" 
          onClick={() => setMenuOpen(false)} 
          className="text-cute-dark hover:text-cute-peach transition-colors clickable"
        >
          [ PLAYLISTS 🎵 ]
        </a>
        <a 
          href="#timeline" 
          onClick={() => setMenuOpen(false)} 
          className="text-cute-dark hover:text-cute-peach transition-colors clickable"
        >
          [ JOURNEY 🎒 ]
        </a>

        <div className="flex items-center space-x-1.5 bg-cute-bg-muted border border-cute-dark rounded-full px-4 py-2 font-mono text-xs font-bold text-cute-dark shadow-[2px_2px_0px_#2d2729] mt-6">
          <span className="w-2 h-2 rounded-full bg-cute-mint animate-pulse" />
          <span>SYS_STATUS: ACTIVE 🍃</span>
        </div>
      </div>

      {/* MAIN CONTENT PORTFOLIO */}
      <main className="flex-1 flex flex-col w-full relative pt-10">
        {/* Grid helper */}
        <div className="absolute inset-0 cute-grid opacity-50 pointer-events-none z-0" />
        
        <div className="w-full relative z-10">
          <IntroSection />
          <HobbiesSection />
          <MediaSection />
          <TimelineSection />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t-4 border-dashed border-cute-dark bg-white py-12 px-4 md:px-8 font-mono text-xs relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-cute-muted">
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-cute-dark font-extrabold text-sm flex items-center gap-1 uppercase">
              <Code2 size={14} className="text-cute-peach" />
              JOHN_PHILLIP_ABOUT_ME
            </span>
          </div>



          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cute-btn px-4 py-1.5 bg-white text-[10px] text-cute-dark font-bold shadow-[2px_2px_0px_#2d2729] hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] clickable"
          >
            GITHUB_SOURCE 🚀
          </a>
        </div>
    </footer>

      </div>
    </>
  );
}
