import React, { useState, useRef, useCallback } from 'react';
import ZoomInIcon from './icons/ZoomInIcon';
import ZoomOutIcon from './icons/ZoomOutIcon';
import ZoomResetIcon from './icons/ZoomResetIcon';

interface ZoomableImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

const MIN_SCALE = 1;
const MAX_SCALE = 8;
const SCALE_STEP = 0.5;

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt, children }) => {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isPanning = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  const clampPan = useCallback((x: number, y: number, currentScale: number) => {
    if (!containerRef.current || currentScale <= MIN_SCALE) return { x: 0, y: 0 };

    const { width, height } = containerRef.current.getBoundingClientRect();
    const overflowX = (width * currentScale - width) / 2 / currentScale;
    const overflowY = (height * currentScale - height) / 2 / currentScale;

    const clampedX = Math.max(-overflowX, Math.min(overflowX, x));
    const clampedY = Math.max(-overflowY, Math.min(overflowY, y));

    return { x: clampedX, y: clampedY };
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isPanning.current) return;

    const delta = e.deltaY * -0.01;
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + delta));
    
    setScale(newScale);
    setPan(prevPan => clampPan(prevPan.x, prevPan.y, newScale));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= MIN_SCALE || e.button !== 0) return;
    e.preventDefault();
    isPanning.current = true;
    startPos.current = { x: e.clientX - pan.x * scale, y: e.clientY - pan.y * scale };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning.current) return;
    e.preventDefault();
    const newX = (e.clientX - startPos.current.x) / scale;
    const newY = (e.clientY - startPos.current.y) / scale;
    setPan(clampPan(newX, newY, scale));
  };
  
  const handleMouseUp = () => {
    isPanning.current = false;
  };
  
  const handleMouseLeave = () => {
    isPanning.current = false;
  };

  const zoomIn = () => {
    const newScale = Math.min(MAX_SCALE, scale + SCALE_STEP);
    setScale(newScale);
    setPan(prevPan => clampPan(prevPan.x, prevPan.y, newScale));
  };

  const zoomOut = () => {
    const newScale = Math.max(MIN_SCALE, scale - SCALE_STEP);
    setScale(newScale);
    setPan(prevPan => clampPan(prevPan.x, prevPan.y, newScale));
  };

  const reset = () => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  };
  
  const buttonClass = "p-2 bg-slate-900/50 rounded-full text-white hover:bg-indigo-600/80 backdrop-blur-sm transition-colors duration-200";

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden touch-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="w-full h-full will-change-transform"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transition: isPanning.current ? 'none' : 'transform 0.1s ease-out',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          draggable={false}
        />
      </div>
      <div className="absolute top-2 left-2 flex flex-col space-y-2 z-10">
        <button onClick={zoomIn} disabled={scale >= MAX_SCALE} className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`} aria-label="Zoom in" title="Zoom in"><ZoomInIcon className="w-5 h-5" /></button>
        <button onClick={zoomOut} disabled={scale <= MIN_SCALE} className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`} aria-label="Zoom out" title="Zoom out"><ZoomOutIcon className="w-5 h-5" /></button>
        <button onClick={reset} disabled={scale <= MIN_SCALE && pan.x === 0 && pan.y === 0} className={`${buttonClass} disabled:opacity-50 disabled:cursor-not-allowed`} aria-label="Reset zoom" title="Reset zoom"><ZoomResetIcon className="w-5 h-5" /></button>
      </div>
      {children}
    </div>
  );
};

export default ZoomableImage;
