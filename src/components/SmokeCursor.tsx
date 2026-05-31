"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  growth: number;
  life: number;
  maxLife: number;
}

export default function SmokeCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices to conserve battery and avoid mouse-move discrepancies
    if (typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60;

    // Track mouse coordinates
    const mouse = { x: 0, y: 0, active: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Spawn 1-2 particles on movement to create continuous wispy smoke
      if (particles.length < maxParticles) {
        particles.push(createParticle(mouse.x, mouse.y));
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    function createParticle(x: number, y: number): Particle {
      return {
        x: x + (Math.random() * 10 - 5),
        y: y + (Math.random() * 10 - 5),
        vx: (Math.random() * 0.8 - 0.4),
        vy: -Math.random() * 0.8 - 0.4, // float upwards slowly
        alpha: Math.random() * 0.25 + 0.1, // subtle translucent smoke
        size: Math.random() * 10 + 10,
        growth: Math.random() * 0.4 + 0.2, // smoke billows out
        life: 0,
        maxLife: Math.random() * 80 + 60,
      };
    }

    function animate() {
      if (!ctx || !canvas) return;

      // Clear with clearRect to keep it clean and performant
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Optionally spawn passive particles at the bottom or near cursor to create atmospheric smoke
      if (mouse.active && Math.random() < 0.2 && particles.length < maxParticles) {
        particles.push(createParticle(mouse.x, mouse.y));
      }

      particles.forEach((p, idx) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.size += p.growth;
        
        // Decay alpha exponentially as it gets closer to max life
        const progress = p.life / p.maxLife;
        p.alpha = (1 - progress) * 0.25;

        // Draw particle
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0, `rgba(238, 233, 227, ${p.alpha})`); // warm ivory smoke color
        grad.addColorStop(0.5, `rgba(245, 239, 235, ${p.alpha * 0.4})`);
        grad.addColorStop(1, "rgba(252, 250, 246, 0)");
        
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Filter out dead particles
      particles = particles.filter((p) => p.life < p.maxLife);

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 mix-blend-screen opacity-65"
      style={{ pointerEvents: "none" }}
    />
  );
}
