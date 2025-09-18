import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
}

// Default animation configurations
export const animationPresets = {
  fadeInUp: {
    duration: 0.8,
    ease: "power2.out",
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    delay: 0
  },
  fadeInDown: {
    duration: 0.8,
    ease: "power2.out",
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0 },
    delay: 0
  },
  scaleIn: {
    duration: 1,
    ease: "power2.out",
    from: { opacity: 0, scale: 0.9, y: -20 },
    to: { opacity: 1, scale: 1, y: 0 },
    delay: 0
  },
  slideInLeft: {
    duration: 0.8,
    ease: "power2.out",
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    delay: 0
  },
  slideInRight: {
    duration: 0.8,
    ease: "power2.out",
    from: { opacity: 0, x: 50 },
    to: { opacity: 1, x: 0 },
    delay: 0
  },
  bounce: {
    duration: 1.2,
    ease: "bounce.out",
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
    delay: 0
  }
};

/**
 * Hook for applying GSAP animations to elements
 */
export function useGsapAnimation<T extends HTMLElement>(
  preset: keyof typeof animationPresets | AnimationConfig,
  dependencies: unknown[] = []
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const config = typeof preset === 'string' ? animationPresets[preset] : preset;

    gsap.fromTo(
      ref.current,
      config.from || {},
      {
        ...config.to,
        duration: config.duration || 0.8,
        ease: config.ease || "power2.out",
        delay: config.delay || 0
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
}

/**
 * Hook for staggered animations (multiple elements)
 */
export function useGsapStagger<T extends HTMLElement>(
  preset: keyof typeof animationPresets | AnimationConfig,
  staggerDelay: number = 0.1,
  dependencies: unknown[] = []
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const config = typeof preset === 'string' ? animationPresets[preset] : preset;
    const children = containerRef.current.children;

    gsap.fromTo(
      children,
      config.from || {},
      {
        ...config.to,
        duration: config.duration || 0.8,
        ease: config.ease || "power2.out",
        delay: config.delay || 0,
        stagger: staggerDelay
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}

/**
 * Hook for hover animations
 */
export function useGsapHover<T extends HTMLElement>(
  hoverIn: gsap.TweenVars,
  hoverOut: gsap.TweenVars,
  duration: number = 0.3
) {
  const ref = useRef<T>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      gsap.to(ref.current, { ...hoverIn, duration });
    }
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      gsap.to(ref.current, { ...hoverOut, duration });
    }
  };

  return {
    ref,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  };
}
