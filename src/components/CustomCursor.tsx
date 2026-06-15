"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const ringVisual = ring.querySelector(".ring-visual") as HTMLElement;
    const dotVisual = dot.querySelector(".dot-visual") as HTMLElement;
    if (!ringVisual || !dotVisual) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      // Instantly position the dot container
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const onMouseEnter = () => {
      visibleRef.current = true;
      setVisible(true);
    };

    // Smooth follower loop with spring delay for a bouncy tail effect
    let animFrameId: number;
    const render = () => {
      // Linear interpolation (lerp) for smooth trailing
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      animFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    render();

    // Cute spring hover effects for interactive visual elements
    const handleMouseEnterInteractive = () => {
      animate(ringVisual, {
        scale: 1.6,
        borderColor: "#2d2729",
        backgroundColor: "rgba(216, 191, 253, 0.45)", // soft lavender
        duration: 350,
        easing: "easeOutElastic(1.2, 0.6)",
      });
      animate(dotVisual, {
        scale: 1.4,
        backgroundColor: "#ffb2a7", // warm peach
        duration: 350,
        easing: "easeOutElastic(1.2, 0.6)",
      });
    };

    const handleMouseLeaveInteractive = () => {
      animate(ringVisual, {
        scale: 1.0,
        borderColor: "#2d2729",
        backgroundColor: "rgba(255, 178, 167, 0.25)", // warm peach tint
        duration: 300,
        easing: "easeOutBack",
      });
      animate(dotVisual, {
        scale: 1.0,
        backgroundColor: "#2d2729",
        duration: 300,
        easing: "easeOutBack",
      });
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .clickable'
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
        
        el.addEventListener("mouseenter", handleMouseEnterInteractive);
        el.addEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };

    addHoverListeners();

    // Watch for DOM changes to attach listeners to dynamic elements
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animFrameId);
      observer.disconnect();
      
      // Clean up interactive listeners
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, [role="button"], .clickable'
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <div
      className={`hidden lg:block fixed inset-0 pointer-events-none z-9999 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer soft ring wrapper (handles translation) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* Inner ring visual (handles scaling & colors) */}
        <div
          className="ring-visual w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-cute-dark bg-cute-peach/25 pointer-events-none transition-colors duration-200"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Outer cute dot wrapper (handles translation) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ willChange: "transform" }}
      >
        {/* Inner cute dot visual (handles scaling & colors) */}
        <div
          className="dot-visual w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full bg-cute-dark pointer-events-none"
          style={{ willChange: "transform" }}
        />
      </div>
    </div>
  );
}
