"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { Gamepad2, Stars, Swords, Skull, Shield, Target, Code2, Plane, MapPin, Mic, Volume2 } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | undefined;
    YT: any;
  }
}

const karaokeSongs = [
  { title: "If I Let You Go",           artist: "Westlife",          youtubeId: "-RpYyxf9cdw" },
  { title: "Harana",                     artist: "Parokya ni Edgar",   youtubeId: "4hmodo8yDCo" },
  { title: "Gitara",                     artist: "Parokya ni Edgar",   youtubeId: "3Rdzqc51cEY" },
  { title: "Magbalik",                   artist: "Callalily",          youtubeId: "HJO1ltBNmik" },
  { title: "Beautiful in My Eyes",       artist: "Joshua Kadison",     youtubeId: "mvgtlwK3G58" },
  { title: "When You Say Nothing at All",artist: "Ronan Keating",      youtubeId: "LWqv-ZmILvY" },
];

export default function HobbiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Coding / App Creator States
  const [appIdea, setAppIdea] = useState<string>("Click compile below! 💡");
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileStatus, setCompileStatus] = useState<string>("");

  const appIdeas = [
    { name: "Slime Care Simulator 🧪", stat: "100% Cozy Vibes", color: "bg-cute-peach" },
    { name: "Thocky Key Soundboard ⌨️", stat: "100% Creamy Audio", color: "bg-cute-sky" },
    { name: "Tokyo Coffee Spot Finder ☕", stat: "100% Aesthetic Maps", color: "bg-cute-lavender" },
    { name: "Retro Cassette Widget 🎵", stat: "100% Analog Nostalgia", color: "bg-cute-yellow" },
    { name: "WWII Movie Log Tracker 🪖", stat: "100% Epic History", color: "bg-cute-mint" },
    { name: "Bouncy Cursor Simulator 🎈", stat: "100% Pure Springs", color: "bg-cute-peach" }
  ];

  const generateAppIdea = () => {
    if (isCompiling) return;
    setIsCompiling(true);
    setCompileStatus("npm install...");
    
    setTimeout(() => setCompileStatus("bundling assets..."), 350);
    setTimeout(() => setCompileStatus("adding cute details..."), 700);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * appIdeas.length);
      const selected = appIdeas[randomIndex];
      setAppIdea(`${selected.name} (${selected.stat})`);
      setIsCompiling(false);
      setCompileStatus("");
      
      // Play cute bounce animation on app idea box
      animate(".cute-compiler-box", {
        scaleX: [1, 1.08, 0.95, 1],
        scaleY: [1, 0.92, 1.05, 1],
        duration: 450,
        easing: "easeOutElastic(1.2, 0.5)"
      });
    }, 1100);
  };

  // Travel / Strolling States
  const [destination, setDestination] = useState<{ city: string; activity: string; color: string } | null>(null);
  const [isBoarding, setIsBoarding] = useState<boolean>(false);

  const travelDestinations = [
    { city: "Tokyo, Japan 🗼", activity: "Strolling through Shibuya streets and Shinjuku Gyoen parks.", color: "bg-cute-peach/30" },
    { city: "Seoul, South Korea 🇰🇷", activity: "Bustling shopping malls in Myeongdong and walking Han River parks.", color: "bg-cute-sky/30" },
    { city: "Singapore 🇸🇬", activity: "Marveling at Jewel Changi mall and strolling Gardens by the Bay.", color: "bg-cute-mint/30" },
    { city: "Osaka, Japan 🏯", activity: "Tasting local food at Dotonbori and strolling around Osaka Castle park.", color: "bg-cute-lavender/30" },
    { city: "Kyoto, Japan 🎋", activity: "Walking through Arashiyama Bamboo Grove and peaceful city parks.", color: "bg-cute-yellow/30" }
  ];

  const boardFlight = () => {
    if (isBoarding) return;
    setIsBoarding(true);

    // Spin plane icon using Anime.js
    animate(".travel-plane-icon", {
      rotate: [0, 360],
      scale: [1, 1.35, 1],
      duration: 800,
      easing: "easeInOutQuad"
    });

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * travelDestinations.length);
      setDestination(travelDestinations[randomIndex]);
      setIsBoarding(false);

      // Pop stamp animation
      animate(".travel-stamp-box", {
        scale: [0.3, 1.05, 1],
        rotate: [-5, 5, 0],
        duration: 400,
        easing: "easeOutElastic(1.1, 0.7)"
      });
    }, 850);
  };

  // Catch the Star Game States
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [targetPos, setTargetPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [targetType, setTargetType] = useState<"🌟" | "💖" | "🍀">("🌟");
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Star pop beep sound
  const playStarSound = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start();
      osc.stop(now + 0.08);
    } catch {}
  };

  // Catch the Star game loops
  const spawnTarget = () => {
    if (!gameAreaRef.current) return;
    const width = gameAreaRef.current.clientWidth - 40;
    const height = gameAreaRef.current.clientHeight - 40;
    
    const randomX = Math.max(15, Math.floor(Math.random() * width));
    const randomY = Math.max(15, Math.floor(Math.random() * height));
    
    const targets: Array<"🌟" | "💖" | "🍀"> = ["🌟", "💖", "🍀"];
    const randomTarget = targets[Math.floor(Math.random() * targets.length)];
    
    setTargetPos({ x: randomX, y: randomY });
    setTargetType(randomTarget);
    
    // Spring pop in
    animate("#game-target", {
      scale: [0, 1.1, 1],
      rotate: [-20, 20, 0],
      duration: 350,
      easing: "easeOutElastic(1.2, 0.6)"
    });
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!gameActive) return;
    
    playStarSound();
    setScore(s => {
      const nextScore = s + 1;
      setHighScore(h => Math.max(h, nextScore));
      return nextScore;
    });
    
    // Pop out animation
    animate("#game-target", {
      scale: [1, 1.3, 0],
      rotate: [0, 90],
      duration: 180,
      easing: "easeInBack"
    }).then(spawnTarget);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(15);
    setTimeout(() => spawnTarget(), 100);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Singing / Karaoke States
  const [selectedSongIndex, setSelectedSongIndex] = useState<number>(0);
  const [isSinging, setIsSinging] = useState<boolean>(false);
  const [micGain, setMicGain] = useState<number>(80);
  const [showScoreStamp, setShowScoreStamp] = useState<boolean>(false);
  const karaokePlayerRef = useRef<any>(null);
  const [isKaraokePlayerReady, setIsKaraokePlayerReady] = useState<boolean>(false);

  // Keep refs for callbacks to avoid stale closures
  const selectedSongIndexRef = useRef(selectedSongIndex);
  useEffect(() => { selectedSongIndexRef.current = selectedSongIndex; }, [selectedSongIndex]);

  const karaokeSongsRef = useRef(karaokeSongs);
  useEffect(() => { karaokeSongsRef.current = karaokeSongs; }, [karaokeSongs]);

  // Load YouTube IFrame API script & initialize karaoke player on mount
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && !karaokePlayerRef.current) {
        karaokePlayerRef.current = new window.YT.Player("karaoke-youtube-player", {
          height: "0",
          width: "0",
          videoId: karaokeSongsRef.current[selectedSongIndexRef.current].youtubeId,
          playerVars: {
            playsinline: 1,
            controls: 0,
            rel: 0,
            showinfo: 0,
            ecver: 2,
          },
          events: {
            onReady: () => {
              setIsKaraokePlayerReady(true);
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsSinging(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsSinging(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                setIsSinging(false);
              }
            },
          },
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      if (karaokePlayerRef.current && typeof karaokePlayerRef.current.destroy === "function") {
        karaokePlayerRef.current.destroy();
        karaokePlayerRef.current = null;
        setIsKaraokePlayerReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Karaoke Equalizer Bars bounce
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let eqAnim: any;
    
    if (isSinging) {
      eqAnim = animate(".karaoke-eq-bar", {
        scaleY: () => {
          const maxVal = micGain / 100;
          const minVal = 0.15;
          const randomVal = Math.random() * (maxVal - minVal) + minVal;
          return randomVal;
        },
        duration: () => Math.random() * 200 + 150,
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        delay: stagger(20)
      });
    } else {
      animate(".karaoke-eq-bar", {
        scaleY: 0.15,
        duration: 300,
        easing: "easeOutQuad"
      });
    }

    return () => {
      if (eqAnim) eqAnim.pause();
    };
  }, [isSinging, micGain]);

  const playCheerSound = () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);
        
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        
        osc.start(start);
        osc.stop(start + duration);
      };
      
      const now = ctx.currentTime;
      playTone(523.25, now, 0.4);       // C5
      playTone(659.25, now + 0.1, 0.4); // E5
      playTone(783.99, now + 0.2, 0.4); // G5
      playTone(1046.50, now + 0.3, 0.6); // C6
    } catch {}
  };

  const handleCheer = () => {
    playCheerSound();
    setShowScoreStamp(true);
    
    // Pop stamp animation
    setTimeout(() => {
      animate(".karaoke-score-stamp", {
        scale: [0, 1.3, 1],
        rotate: [-15, 10, -5],
        duration: 350,
        easing: "easeOutElastic(1.1, 0.6)"
      });
    }, 50);

    setTimeout(() => {
      animate(".karaoke-score-stamp", {
        opacity: 0,
        scale: 1.5,
        duration: 400,
        easing: "easeInQuad"
      }).then(() => {
        setShowScoreStamp(false);
      });
    }, 1500);
  };

  // Stagger reveal animations for cards using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".cute-hobby-card", {
              opacity: [0, 1],
              scale: [0.92, 1],
              translateY: [40, 0],
              duration: 800,
              delay: stagger(150),
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

  return (
    <section 
      ref={sectionRef}
      id="hobbies" 
      className="py-24 px-4 md:px-8 bg-cute-bg relative overflow-hidden cute-dots"
    >
      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-cute-dark tracking-tight">
            My Hobbies & Favorites ✨
          </h2>
          <p className="text-cute-muted max-w-xl mx-auto font-mono text-xs md:text-sm uppercase tracking-widest">
            {"// Code, Games, Travel, & Singing"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: Coding & Creating Applications */}
          <div className="cute-hobby-card cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between opacity-0">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💻</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-cute-dark">
                    Coding & Dev
                  </h3>
                </div>
                <Code2 size={18} className="text-cute-peach animate-pulse" />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold font-mono text-cute-muted uppercase tracking-wider mb-1">
                    The Passion
                  </h4>
                  <p className="text-sm text-cute-dark font-medium leading-relaxed font-sans">
                    Building application prototypes, writing clean code, and solving real-world challenges. Designing and creating custom software is my favorite craft!
                  </p>
                </div>

                {/* Compiler simulator block */}
                <div className="border-2 border-cute-dark bg-cute-bg-muted rounded-2xl p-4 space-y-4 shadow-inner text-center">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-cute-muted uppercase">
                    <span>App idea compiler</span>
                    <span>v1.0.4</span>
                  </div>
                  
                  <div className="cute-compiler-box w-full py-4 px-2 bg-white border-2 border-cute-dark rounded-xl flex flex-col items-center justify-center min-h-[72px] shadow-[2px_2px_0px_#2d2729]">
                    {isCompiling ? (
                      <div className="flex flex-col items-center space-y-1">
                        <span className="w-4 h-4 border-2 border-t-transparent border-cute-peach rounded-full animate-spin" />
                        <span className="font-mono text-[9px] text-cute-muted uppercase tracking-wider animate-pulse">{compileStatus}</span>
                      </div>
                    ) : (
                      <span className="font-sans font-bold text-xs text-cute-dark leading-normal px-2">
                        {appIdea}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={generateAppIdea}
                    disabled={isCompiling}
                    className="cute-btn w-full py-2 bg-cute-peach text-cute-dark font-mono text-[10px] font-bold tracking-wide uppercase hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] clickable disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Compile App Idea ⚙️
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Competitive Gaming */}
          <div className="cute-hobby-card cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between opacity-0">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎮</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-cute-dark">
                    Gaming
                  </h3>
                </div>
                <Gamepad2 size={18} className="text-cute-lavender animate-pulse" />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold font-mono text-cute-muted uppercase tracking-wider mb-1">
                    The Vibe
                  </h4>
                  <p className="text-sm text-cute-dark font-medium leading-relaxed font-sans">
                    Tactical, strategic, and intense games that keep me sharp! My favorite rotations are Dota 2, Warhammer 40k Space Marine 2, Company of Heroes 3, and Tom Clancy&apos;s Rainbow Six Siege.
                  </p>
                </div>

                {/* Game tags */}
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { name: "Dota 2", icon: Swords, color: "bg-cute-peach/30" },
                    { name: "Space Marine 2", icon: Skull, color: "bg-cute-sky/30" },
                    { name: "Company of Heroes 3", icon: Shield, color: "bg-cute-lavender/30" },
                    { name: "Rainbow Six Siege", icon: Target, color: "bg-cute-yellow/30" },
                  ].map((game) => {
                    const GameIcon = game.icon;
                    return (
                      <div key={game.name} className="p-2 bg-cute-bg-muted border-2 border-cute-dark rounded-xl flex items-center space-x-2.5 shadow-[1.5px_1.5px_0px_#2d2729]">
                        <div className={`p-1 rounded-lg border border-cute-dark ${game.color} flex items-center justify-center shrink-0`}>
                          <GameIcon size={12} className="text-cute-dark" />
                        </div>
                        <span className="font-bold text-[11px] text-cute-dark tracking-tight leading-none">{game.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Mini game Catch the Star */}
                <div className="border-2 border-cute-dark bg-cute-bg-muted rounded-2xl p-3 space-y-2 relative shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-cute-dark uppercase tracking-wide flex items-center gap-0.5">
                      <Stars size={10} className="text-cute-dark animate-pulse" />
                      Star Catcher
                    </span>
                    <div className="flex space-x-2 font-mono text-[8px] font-bold">
                      <span>Score: <strong className="text-cute-peach">{score}</strong></span>
                      <span className="text-cute-muted">Record: <strong>{highScore}</strong></span>
                    </div>
                  </div>

                  <div 
                    ref={gameAreaRef}
                    onClick={gameActive ? () => setScore(s => Math.max(0, s - 1)) : undefined}
                    className="w-full h-28 bg-[#ffeedb] rounded-xl relative overflow-hidden border-2 border-cute-dark shadow-inner cursor-pointer flex items-center justify-center"
                  >
                    {!gameActive ? (
                      <div className="text-center space-y-1.5 z-10 px-2">
                        <p className="text-[10px] text-cute-dark font-bold font-sans">
                          Catch the star!
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startGame();
                          }}
                          className="cute-btn px-3 py-1 bg-cute-lavender text-cute-dark font-mono text-[9px] font-bold hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] clickable"
                        >
                          Play 🎮
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Target Star/Heart */}
                        <div
                          id="game-target"
                          onClick={handleTargetClick}
                          className="absolute text-2xl select-none cursor-pointer flex items-center justify-center p-1.5 clickable animate-spin"
                          style={{
                            left: `${targetPos.x}px`,
                            top: `${targetPos.y}px`,
                            lineHeight: 1,
                            animationDuration: '3s'
                          }}
                        >
                          {targetType}
                        </div>

                        {/* Timer */}
                        <div className="absolute top-1.5 left-1.5 text-[8px] font-mono font-bold text-cute-muted uppercase">
                          TIME: {timeLeft}s
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Traveling & Strolling */}
          <div className="cute-hobby-card cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between opacity-0">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✈️</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-cute-dark">
                    Travel & Strolling
                  </h3>
                </div>
                <Plane size={18} className="travel-plane-icon text-cute-sky animate-bounce" style={{ animationDuration: '4s' }} />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold font-mono text-cute-muted uppercase tracking-wider mb-1">
                    Adventure Mode
                  </h4>
                  <p className="text-sm text-cute-dark font-medium leading-relaxed font-sans">
                    I love to travel, onboard on a plane, and visit places I have never been. Strolling around shopping malls, scenic parks, and vibrant cities is my favorite way to reset and get inspired!
                  </p>
                </div>

                {/* Passport stamp block */}
                <div className="border-2 border-cute-dark bg-cute-bg-muted rounded-2xl p-4 space-y-4 shadow-inner text-center">
                  <div className="flex justify-between items-center text-[9px] font-mono font-bold text-cute-muted uppercase">
                    <span>Passport Stamp</span>
                    <span>Boarded ✈️</span>
                  </div>

                  <div className="travel-stamp-box w-full py-3 px-2.5 bg-white border-2 border-dashed border-cute-dark rounded-xl flex flex-col items-center justify-center min-h-[82px] shadow-[2px_2px_0px_#2d2729] transition-transform duration-300">
                    {destination ? (
                      <div className="space-y-1.5 text-center">
                        <div className="flex items-center justify-center space-x-1 font-sans font-extrabold text-xs text-cute-dark">
                          <MapPin size={12} className="text-cute-peach" />
                          <span>{destination.city}</span>
                        </div>
                        <p className="text-[10px] text-cute-muted font-bold font-sans leading-normal px-1">
                          {destination.activity}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center font-mono text-[10px] font-bold text-cute-muted uppercase tracking-wide flex flex-col items-center space-y-1">
                        <span>Stamp Passport! 🗺️</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={boardFlight}
                    disabled={isBoarding}
                    className="cute-btn w-full py-2 bg-cute-sky text-cute-dark font-mono text-[10px] font-bold tracking-wide uppercase hover:cute-card-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] clickable disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Board Flight & Stroll ✈️
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Singing & Karaoke */}
          <div className="cute-hobby-card cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between opacity-0">
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎤</span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-cute-dark">
                    Singing & Karaoke
                  </h3>
                </div>
                <Mic size={18} className="text-cute-peach animate-bounce" style={{ animationDuration: '3s' }} />
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold font-mono text-cute-muted uppercase tracking-wider mb-1">
                    The Passion
                  </h4>
                  <p className="text-sm text-cute-dark font-medium leading-relaxed font-sans">
                    Belting out my favorite tunes on the karaoke machine! It&apos;s the ultimate way to bring positive vibes and connect with friends. Here are my absolute go-to tracks:
                  </p>
                </div>

                {/* Song Selection List */}
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 border border-cute-dark/10 rounded-xl p-1 bg-cute-bg-muted/50">
                  {karaokeSongs.map((song, index) => (
                    <button
                      key={song.title}
                      onClick={() => {
                        setSelectedSongIndex(index);
                        setIsSinging(true);
                        if (karaokePlayerRef.current && isKaraokePlayerReady) {
                          karaokePlayerRef.current.loadVideoById(karaokeSongs[index].youtubeId);
                        }
                      }}
                      className={`w-full text-left p-1.5 px-3 rounded-lg border text-xs font-bold font-sans transition-all flex justify-between items-center clickable ${
                        selectedSongIndex === index
                          ? "bg-cute-peach border-cute-dark text-cute-dark shadow-[1.5px_1.5px_0px_#2d2729]"
                          : "bg-white border-transparent text-cute-muted hover:bg-cute-peach/10"
                      }`}
                    >
                      <span className="truncate">{song.title}</span>
                      <span className="text-[10px] font-mono opacity-80 shrink-0 font-normal">{song.artist}</span>
                    </button>
                  ))}
                </div>

                {/* Interactive Karaoke CRT/LED Screen */}
                <div className="border-2 border-cute-dark bg-[#1a1718] rounded-2xl p-4 space-y-4 shadow-inner relative overflow-hidden min-h-[175px] flex flex-col justify-between">
                  {/* CRT Screen Scanline effect */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-white/10 opacity-10 pointer-events-none z-10" />
                  
                  <div className="flex justify-between items-center text-[8px] font-mono font-bold text-cute-mint uppercase tracking-wider z-10">
                    <span>Karaoke Machine v2.5</span>
                    <span className="animate-pulse">{isSinging ? "● SING-ALONG ACTIVE" : "■ SYSTEM STANDBY"}</span>
                  </div>

                  {/* Lyrics CRT Display Box */}
                  <div className="w-full py-4 px-2 flex flex-col items-center justify-center min-h-[72px] text-center z-10 relative">
                    {showScoreStamp ? (
                      <div className="karaoke-score-stamp absolute inset-0 flex items-center justify-center z-20">
                        <span className="bg-cute-yellow text-cute-dark border-2 border-cute-dark text-sm font-extrabold px-3 py-1.5 rounded-xl -rotate-6 shadow-[3px_3px_0px_#2d2729]">
                          💯 PERFECT! 🌟
                        </span>
                      </div>
                    ) : null}

                    <span className="font-mono text-[9px] text-cute-sky/80 uppercase tracking-widest mb-1.5">
                      {karaokeSongs[selectedSongIndex].title} - {karaokeSongs[selectedSongIndex].artist}
                    </span>
                    {isSinging ? (
                      <div className="flex items-end gap-3 justify-center mt-1">
                        {['♪', '♩', '♫', '♩', '♪'].map((note, i) => (
                          <span
                            key={i}
                            className="text-2xl text-[#fff8f0] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] select-none"
                            style={{
                              display: 'inline-block',
                              animation: 'karaoke-bounce 0.7s ease-in-out infinite alternate',
                              animationDelay: `${i * 0.12}s`,
                            }}
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-cute-mint/60 font-mono mt-1">Select a song and press Sing! 🎤</p>
                    )}
                  </div>

                  {/* Equalizer Visualizer & Controls */}
                  <div className="flex justify-between items-center z-10 border-t border-white/10 pt-3">
                    {/* Equalizer */}
                    <div className="flex items-end h-5 gap-0.5 w-24">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div
                          key={i}
                          className="karaoke-eq-bar w-1.5 h-full rounded-t-sm origin-bottom bg-cute-mint border border-cute-dark"
                          style={{ transform: 'scaleY(0.15)' }}
                        />
                      ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          if (!karaokePlayerRef.current || !isKaraokePlayerReady) return;
                          if (isSinging) {
                            karaokePlayerRef.current.pauseVideo();
                            setIsSinging(false);
                          } else {
                            karaokePlayerRef.current.playVideo();
                            setIsSinging(true);
                          }
                        }}
                        className={`w-24 px-3 py-1 border-2 border-cute-dark rounded-full text-[9px] font-mono font-bold transition-all shadow-[1.5px_1.5px_0px_#2d2729] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_#2d2729] clickable ${
                          isSinging
                            ? "bg-cute-peach text-cute-dark"
                            : "bg-white text-cute-dark"
                        }`}
                      >
                        {isSinging ? "Pause ⏸" : "Sing! 🎤"}
                      </button>

                      <button
                        onClick={handleCheer}
                        className="px-2.5 py-1 border-2 border-cute-dark rounded-full text-[9px] font-mono font-bold bg-cute-yellow text-cute-dark shadow-[1.5px_1.5px_0px_#2d2729] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0.5px_0.5px_0px_#2d2729] clickable"
                      >
                        Cheer 👏
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mic Gain Slider */}
                <div className="flex items-center justify-between p-2.5 bg-cute-bg-muted border border-cute-dark/20 rounded-xl shadow-[1px_1px_0px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center space-x-2 font-mono text-[9px] font-bold text-cute-muted">
                    <Volume2 size={12} className="text-cute-dark" />
                    <span>MIC GAIN</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={micGain}
                      onChange={(e) => setMicGain(Number(e.target.value))}
                      className="w-24 h-1.5 bg-cute-dark/20 rounded-lg appearance-none cursor-pointer accent-cute-peach"
                    />
                    <span className="font-mono text-[9px] font-bold text-cute-dark w-6 text-right">
                      {micGain}%
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Audio-only YouTube player for karaoke: off-screen */}
      <div
        id="karaoke-youtube-player"
        style={{ position: 'fixed', width: '0px', height: '0px', border: 'none', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />
    </section>
  );
}
