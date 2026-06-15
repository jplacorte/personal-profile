"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { animate, stagger, random } from "animejs";
import { Play, Pause, SkipForward, SkipBack, Music, Film, Trophy, X } from "lucide-react";

export default function MediaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Music Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Gallery State
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Prevent background scrolling when image modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const tracks = [
    { title: "Shelter (Ghibli Version) ☁️", artist: "Porter Robinson", duration: "04:40", type: "Orchestral", youtubeId: "tY3x3JXqAJs" },
    { title: "Octopath Traveler Main Theme 🎻", artist: "Yasunori Nishiki", duration: "02:35", type: "Game OST", youtubeId: "sR1OHW_IReI" }
  ];

  const tvShows = [
    "The Big Bang Theory ⚛️",
    "Brooklyn 99 🚓",
    "Young Sheldon 🧠",
    "Modern Family 🏡",
    "Rick and Morty 🧪",
    "Family Guy 📺",
    "Gravity Falls 🌲",
    "Phineas and Ferb 🛠️",
    "Game of Thrones 👑",
    "House of the Dragon 🐉",
    "The Lord of the Rings: The Rings of Power 💍",
    "MCU 🛡️",
    "Pirates of the Caribbean 🏴‍☠️"
  ];

  const currentAnimes = [
    { title: "Classroom of the Elite", season: "Season 4", desc: "Mind games, school politics, and high-stakes strategy.", color: "bg-cute-peach/20" },
    { title: "Wistoria: Wand & Sword", season: "Season 2", desc: "Magical fantasy combat and high-action sword fighting.", color: "bg-cute-sky/20" },
    { title: "That Time I was Reincarnated as a Slime", season: "Season 4", desc: "Cozy nation-building fantasy adventure.", color: "bg-cute-lavender/20" }
  ];

  const warMedia = [
    "Hacksaw Ridge 🎖️",
    "Band of Brothers 🎖️",
    "The Pacific 🎖️",
    "Midway ⚓",
    "Masters of the Air ✈️",
    "Fury 🛡️",
    "Saving Private Ryan 🪖",
    "Enemy at the Gates 🎯",
    "All Quiet on the Western Front 🪖",
    "1917 🪖",
    "Valkyrie 🛡️",
    "The Forgotten Battle 🗺️",
    "The Six Triple Eight ✉️",
    "The Boy in the Striped Pajamas 🧸"
  ];

  const handlePlayPause = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setCurrentSeconds(0);
  };

  const handlePrevTrack = () => {
    if (!hasStarted) {
      setHasStarted(true);
    }
    setIsPlaying(true);
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setCurrentSeconds(0);
  };

  const parseDurationToSeconds = (durStr: string) => {
    const parts = durStr.split(":");
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  // Keep a ref to currentTrackIndex so the interval always sees the latest value
  const currentTrackIndexRef = useRef(currentTrackIndex);
  useEffect(() => { currentTrackIndexRef.current = currentTrackIndex; }, [currentTrackIndex]);

  // Music progress loop — auto-advances to next track when duration ends
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          const track = tracks[currentTrackIndexRef.current];
          const totalSecs = parseDurationToSeconds(track.duration);
          if (prev >= totalSecs - 1) {
            // Schedule the track advance outside the state updater
            setTimeout(() => {
              setCurrentTrackIndex((idx) => (idx + 1) % tracks.length);
              setCurrentSeconds(0);
            }, 0);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrackIndex]);

  // Sync play/pause state with YouTube iframe via postMessage
  useEffect(() => {
    if (!hasStarted || !iframeRef.current) return;
    try {
      const message = isPlaying 
        ? { event: "command", func: "playVideo", args: [] }
        : { event: "command", func: "pauseVideo", args: [] };
      iframeRef.current.contentWindow?.postMessage(JSON.stringify(message), "*");
    } catch (err) {
      console.error("Failed to post message to iframe:", err);
    }
  }, [isPlaying, hasStarted]);

  // Equalizer Bars bounce
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let eqAnim: any;
    
    if (isPlaying) {
      eqAnim = animate(".cute-eq-bar", {
        scaleY: () => random(0.2, 1.0),
        duration: () => random(200, 400),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
        delay: stagger(30)
      });
    } else {
      animate(".cute-eq-bar", {
        scaleY: 0.2,
        duration: 400,
        easing: "easeOutQuad"
      });
    }

    return () => {
      if (eqAnim) eqAnim.pause();
    };
  }, [isPlaying, currentTrackIndex]);

  // Cassette Reels Spin loop
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let reelAnim: any;
    
    if (isPlaying) {
      reelAnim = animate(".cassette-reel", {
        rotate: 360,
        duration: 3500,
        loop: true,
        easing: "linear"
      });
    } else {
      animate(".cassette-reel", {
        rotate: 0,
        duration: 400,
        easing: "easeOutQuad"
      });
    }

    return () => {
      if (reelAnim) reelAnim.pause();
    };
  }, [isPlaying]);

  // Scroll animations using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(".cute-media-item", {
              opacity: [0, 1],
              scale: [0.93, 1],
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

  const totalSeconds = parseDurationToSeconds(tracks[currentTrackIndex].duration);
  const progressPercent = totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;

  return (
    <section 
      ref={sectionRef}
      id="media" 
      className="py-24 px-4 md:px-8 bg-cute-bg relative overflow-hidden cute-grid"
    >
      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl md:text-5xl font-extrabold text-cute-dark tracking-tight">
            Media & Playlists 🎵
          </h2>
          <p className="text-cute-muted max-w-xl mx-auto font-mono text-xs md:text-sm uppercase tracking-widest">
            {"// My favorite beats & TV Shows"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cassette Player card - lg:col-span-5 */}
          <div className="cute-media-item lg:col-span-5 w-full cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col items-center">
            
            <div className="w-full flex justify-between items-center mb-6 font-mono text-xs text-cute-dark/70 font-bold uppercase">
              <span className="flex items-center gap-1">
                <Music size={12} className="text-cute-peach" />
                sys_music_player
              </span>
              <span className="text-cute-peach tracking-wide">
                {isPlaying ? "playing!" : "paused"}
              </span>
            </div>

            {/* Cute Cassette Drawing */}
            <div className="w-full aspect-[1.6/1] bg-cute-lavender border-[3px] border-cute-dark rounded-2xl p-4 flex flex-col justify-between shadow-[4px_4px_0px_#2d2729] mb-6 relative overflow-hidden">
              {/* Cassette label */}
              <div className="w-full h-2/3 bg-white border-[2.5px] border-cute-dark rounded-xl p-2.5 flex flex-col justify-between relative">
                {/* Lines */}
                <div className="absolute top-1 left-2 right-2 h-[2px] bg-cute-peach" />
                <div className="absolute top-2 left-2 right-2 h-[2px] bg-cute-sky" />
                
                <div className="text-[10px] font-bold font-mono tracking-tighter text-center text-cute-dark pt-1 line-clamp-1">
                  {tracks[currentTrackIndex].title}
                </div>

                {/* Cassette Window & Reels */}
                <div className="w-2/3 mx-auto h-8 bg-cute-bg border-2 border-cute-dark rounded-md flex items-center justify-around px-2 relative">
                  {/* Left reel */}
                  <div className="cassette-reel w-5 h-5 rounded-full border-2 border-dashed border-cute-dark bg-white flex items-center justify-center font-bold text-[8px]">
                    +
                  </div>
                  {/* Center glass cutout window lines */}
                  <div className="w-6 h-1 bg-cute-muted/20 rounded" />
                  {/* Right reel */}
                  <div className="cassette-reel w-5 h-5 rounded-full border-2 border-dashed border-cute-dark bg-white flex items-center justify-center font-bold text-[8px]">
                    +
                  </div>
                </div>
              </div>

              {/* Cassette footer trap */}
              <div className="w-2/3 mx-auto h-4 bg-cute-bg-muted border-2 border-cute-dark border-t-0 rounded-b-lg flex justify-around items-center px-4">
                <div className="w-1.5 h-1.5 rounded-full bg-cute-dark" />
                <div className="w-1.5 h-1.5 rounded-full bg-cute-dark" />
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center w-full mb-6">
              <h3 className="text-lg font-bold font-sans text-cute-dark tracking-tight">
                {tracks[currentTrackIndex].title}
              </h3>
              <p className="text-xs text-cute-muted font-bold font-mono mt-0.5">
                {tracks[currentTrackIndex].artist}
              </p>
              <span className="inline-block mt-2 px-3 py-0.5 border border-cute-dark rounded-full bg-cute-sky text-[9px] font-mono font-bold text-cute-dark">
                {tracks[currentTrackIndex].type}
              </span>
            </div>

            {/* Bouncy Equalizer */}
            <div className="flex justify-center items-end h-10 gap-1.5 w-full max-w-[160px] mb-8 origin-bottom">
              {Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={i} 
                  className="cute-eq-bar w-2 h-full rounded-t-full origin-bottom bg-cute-peach border border-cute-dark transition-all duration-300"
                  style={{ transform: 'scaleY(0.2)' }}
                />
              ))}
            </div>

            {/* Cute slider progress */}
            <div className="w-full space-y-1 mb-6">
              <div className="w-full h-2 bg-cute-bg border-2 border-cute-dark rounded-full relative overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-cute-peach rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] font-bold text-cute-muted">
                <span>{formatTime(currentSeconds)}</span>
                <span>{tracks[currentTrackIndex].duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-5">
              <button 
                onClick={handlePrevTrack}
                className="w-10 h-10 rounded-full border-2 border-cute-dark bg-white flex items-center justify-center text-cute-dark hover:bg-cute-sky clickable shadow-[2px_2px_0px_#2d2729] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729]"
              >
                <SkipBack size={16} />
              </button>

              <button 
                onClick={handlePlayPause}
                className={`w-14 h-14 rounded-full border-2 border-cute-dark flex items-center justify-center text-cute-dark font-bold hover:bg-cute-sky clickable shadow-[3px_3px_0px_#2d2729] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729] ${isPlaying ? "bg-cute-peach" : "bg-white"}`}
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
              </button>

              <button 
                onClick={handleNextTrack}
                className="w-10 h-10 rounded-full border-2 border-cute-dark bg-white flex items-center justify-center text-cute-dark hover:bg-cute-sky clickable shadow-[2px_2px_0px_#2d2729] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#2d2729]"
              >
                <SkipForward size={16} />
              </button>
            </div>

            {/* Travel with Music Quote */}
            <div className="w-full mt-6 p-3.5 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729] text-center">
              <p className="text-xs text-cute-dark font-semibold leading-relaxed font-sans">
                🎵 I love to travel with music—it helps me reset and motivates me to work harder!
              </p>
            </div>
            {/* Audio-only YouTube player: off-screen so it plays but is invisible */}
            {hasStarted && (
              <iframe
                ref={iframeRef}
                key={`yt-${currentTrackIndex}`}
                src={`https://www.youtube.com/embed/${tracks[currentTrackIndex].youtubeId}?enablejsapi=1&autoplay=1&controls=0&rel=0&mute=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={tracks[currentTrackIndex].title}
                style={{ position: 'fixed', width: '0px', height: '0px', border: 'none', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }}
              />
            )}
          </div>

          {/* TV Shows & Sports grids - lg:col-span-7 */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            
            {/* TV & Movies cute grid */}
            <div className="cute-media-item cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span className="font-mono text-xs text-cute-muted font-bold uppercase tracking-wide flex items-center gap-1">
                    <Film size={14} className="text-cute-peach animate-pulse" />
                    Binge-watch lists 🎬
                  </span>
                </div>

                {/* Binge-watching and True Stories statement */}
                <div className="mb-5 p-4 bg-cute-sky/30 border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729]">
                  <p className="text-xs text-cute-dark font-semibold leading-relaxed font-sans">
                    🌸 I love to binge-watch, it escapes me from reality, and I really love watching movies that are based on true stories also!
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Category 1: Binge-Watched Shows */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold text-cute-muted uppercase tracking-wider mb-3 flex items-center gap-1">
                      📺 Binge-Watched Shows
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tvShows.map((show) => (
                        <span 
                          key={show} 
                          className="px-3 py-1 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl font-sans font-bold text-xs text-cute-dark shadow-[1.5px_1.5px_0px_#2d2729]"
                        >
                          {show}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: Anime Right Now */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold text-cute-muted uppercase tracking-wider mb-3 flex items-center gap-1">
                      🔥 Currently Watching Anime
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentAnimes.map((anime) => (
                        <div 
                          key={anime.title} 
                          className="p-3 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl hover:bg-cute-peach/10 transition-all shadow-[2px_2px_0px_#2d2729]"
                        >
                          <div className="flex justify-between items-start gap-1">
                            <h5 className="font-sans font-extrabold text-xs text-cute-dark leading-snug">
                              {anime.title}
                            </h5>
                            <span className={`px-1.5 py-0.5 border border-cute-dark rounded-full text-[8px] font-mono font-bold text-cute-dark ${anime.color} shrink-0`}>
                              {anime.season}
                            </span>
                          </div>
                          <p className="text-[10px] text-cute-muted font-bold font-sans mt-1.5 leading-relaxed">
                            {anime.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: War Series & Movies */}
                  <div>
                    <h4 className="font-mono text-[10px] font-bold text-cute-muted uppercase tracking-wider mb-3 flex items-center gap-1">
                      ⚔️ WWI & WWII Series & Movies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {warMedia.map((media) => (
                        <span 
                          key={media} 
                          className="px-3 py-1 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl font-sans font-bold text-xs text-cute-dark shadow-[1.5px_1.5px_0px_#2d2729]"
                        >
                          {media}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sports breakdown */}
            <div className="cute-media-item cute-card rounded-3xl p-6 bg-white hover:cute-card-hover flex flex-col justify-between relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4 font-mono text-xs text-cute-muted font-bold uppercase tracking-wide">
                  <span className="flex items-center gap-1">
                    <Trophy size={14} className="text-cute-lavender animate-pulse" />
                    Sports 🏆
                  </span>
                </div>
                <div className="space-y-4">


                  <div className="p-4 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729]">
                    <h4 className="text-sm font-bold text-cute-dark font-sans flex items-center gap-1.5">
                      🎮 Tournament Watching
                    </h4>
                    <p className="text-xs text-cute-dark font-medium leading-relaxed mt-1.5 font-sans">
                      I love watching Dota 2, League of Legends, and Rainbow Six Siege tournaments. The team chemistry, draft/ban phases, and tournament atmospheres are super fun to watch!
                    </p>
                  </div>

                  <div className="p-4 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729]">
                    <h4 className="text-sm font-bold text-cute-dark font-sans flex items-center gap-1.5">
                      🏀 Basketball
                    </h4>
                    <p className="text-xs text-cute-dark font-medium leading-relaxed mt-1.5 font-sans">
                      I love to play basketball! It&apos;s my favorite physical sport to stay active and build teamwork.
                    </p>
                  </div>

                  <div className="p-4 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729]">
                    <h4 className="text-sm font-bold text-cute-dark font-sans flex items-center gap-1.5">
                      🏸 Badminton
                    </h4>
                    <p className="text-xs text-cute-dark font-medium leading-relaxed mt-1.5 font-sans">
                      I play badminton for fun and a great workout — fast rallies, smashes, and quick footwork make it one of my go-to sports!
                    </p>
                  </div>

                  <div className="p-4 bg-cute-bg-muted border-2 border-cute-dark rounded-2xl shadow-[2px_2px_0px_#2d2729]">
                    <h4 className="text-sm font-bold text-cute-dark font-sans flex items-center gap-1.5">
                      ♟️ Chess Competitions
                    </h4>
                    <p className="text-xs text-cute-dark font-medium leading-relaxed mt-1.5 font-sans">
                      I play chess competitions during my high school years, which sharpened my focus, tactical calculations, and strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          </div>

          {/* Gallery Section */}
          <div className="mt-12 w-full z-20 relative">
            <div className="flex justify-between items-center mb-6">
              <span className="font-mono text-sm text-cute-muted font-bold uppercase tracking-wide flex items-center gap-2">
                <span className="text-xl">📸</span> Photo Gallery
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                <div 
                  key={num} 
                  onClick={() => setSelectedImage(num)}
                  className="cute-card rounded-2xl overflow-hidden bg-white p-2 border-2 border-cute-dark shadow-[3px_3px_0px_#2d2729] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#2d2729] transition-all group cursor-pointer"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-cute-dark bg-cute-bg-muted">
                    <img 
                      src={`/gallery/img${num}.jpg`} 
                      alt={`Gallery Image ${num}`}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
  
        </div>
        </div>

        {/* Fullscreen Image Modal */}
        {selectedImage !== null && mounted && createPortal(
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-cute-dark/80 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full border-2 border-cute-dark flex items-center justify-center text-cute-dark shadow-[3px_3px_0px_#2d2729] hover:bg-cute-peach hover:-translate-y-1 hover:shadow-[5px_5px_0px_#2d2729] transition-all z-50 clickable"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div 
              className="relative w-full max-w-[90vw] md:max-w-4xl mx-auto my-auto flex justify-center items-center rounded-2xl md:rounded-3xl overflow-hidden border-2 md:border-4 border-cute-dark bg-cute-bg-muted shadow-[4px_4px_0px_#2d2729] md:shadow-[8px_8px_0px_#2d2729] p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={`/gallery/img${selectedImage}.jpg`} 
                alt={`Full Gallery Image ${selectedImage}`}
                className="mx-auto max-w-full max-h-[70vh] md:max-h-[80vh] w-auto h-auto object-contain rounded-lg md:rounded-2xl"
              />
            </div>
          </div>,
          document.body
        )}

    </section>
  );
}
