'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = ''
}) => {
  // Use provided start value or default to 85% of the final value to avoid the jarring 0->number jump
  const startValue = useMemo(() => start ?? Math.floor(end * 0.85), [start, end]);
  const [count, setCount] = useState(() => start ?? Math.floor(end * 0.85));
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        // Calculate the animated value from startValue to end
        const animatedValue = startValue + (easeOutQuart * (end - startValue));
        setCount(Math.floor(animatedValue));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration, startValue, start]);

  // Format number with separators for thousands
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <div ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
};
