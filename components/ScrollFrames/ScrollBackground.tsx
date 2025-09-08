"use client"

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 210;

interface ScrollBackgroundProps {
    children?: React.ReactNode;
}

const ScrollBackground: React.FC<ScrollBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = React.useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  // Load images
  useEffect(() => {
    const frameImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) {
        setImagesLoaded(true);
      }
    };
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = `/frames/l/${i.toString().padStart(4, '0')}.webp`;
      frameImages.push(img);
    }
    
    setImages(frameImages);
  }, []);

  // Setup animation
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas size to match viewport
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      context.scale(scale, scale);
    };

    resizeCanvas();

    const frameState = { frame: 0 };

    const render = () => {
      const frameIndex = Math.min(Math.floor(frameState.frame), images.length - 1);
      const img = images[frameIndex];
      
      if (img && img.complete) {
        const rect = container.getBoundingClientRect();
        context.clearRect(0, 0, rect.width, rect.height);
        
        // Scale image to cover the container
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = rect.width / rect.height;
        
        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to height
          drawHeight = rect.height;
          drawWidth = drawHeight * imgAspect;
          offsetX = (rect.width - drawWidth) / 2;
        } else {
          // Image is taller - fit to width
          drawWidth = rect.width;
          drawHeight = drawWidth / imgAspect;
          offsetY = (rect.height - drawHeight) / 2;
        }
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Setup GSAP animation with document as trigger
    const tl = gsap.to(frameState, {
      frame: TOTAL_FRAMES - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: render,
        invalidateOnRefresh: true
      }
    });

    // Initial render
    render();

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      render();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      tl.kill();
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [images, imagesLoaded]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 w-full h-full"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover"
      />
      {children}
    </div>
  );
};

export default ScrollBackground;