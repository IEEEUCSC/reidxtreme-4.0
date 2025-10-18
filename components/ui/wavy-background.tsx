"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { createNoise3D } from "simplex-noise";

type Speed = "slow" | "fast";

interface WavyBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: Speed;
  waveOpacity?: number;
}

const DEFAULT_COLORS = ["#00A074", "#00BE8A", "#008A64", "#14B8A6", "#00D4FF"];

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors = DEFAULT_COLORS,
  waveWidth = 50,
  backgroundFill = "transparent",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const getSpeed = (s: Speed) => (s === "fast" ? 0.002 : 0.001);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    ctx.filter = `blur(${blur}px)`;
    let nt = 0;

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = `blur(${blur}px)`;
    };

    window.addEventListener("resize", handleResize);

    const drawWave = (n: number) => {
      nt += getSpeed(speed);
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth;
        ctx.strokeStyle = colors[i % colors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const renderFrame = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = waveOpacity;
      ctx.fillRect(0, 0, w, h);
      drawWave(5);
      animationIdRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blur, waveWidth, backgroundFill, waveOpacity, speed, colors]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-screen flex-col items-center justify-center overflow-hidden",
        containerClassName,
      )}
      {...props}
    >
      <canvas
        className="absolute inset-0 z-0 h-full w-full"
        ref={canvasRef}
        id="wavy-canvas"
        style={isSafari ? { filter: `blur(${blur}px)` } : undefined}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};

export default WavyBackground;
