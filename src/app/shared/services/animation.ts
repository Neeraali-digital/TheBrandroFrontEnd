import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface AnimationConfig {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  stagger?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private observers: Map<string, IntersectionObserver> = new Map();
  private animatedElements: Set<Element> = new Set();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Initialize scroll-triggered animations for elements with reveal classes
   */
  initScrollAnimations(config: AnimationConfig = {}): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const defaultConfig = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      delay: 0,
      stagger: 100
    };

    const finalConfig = { ...defaultConfig, ...config };

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
            this.animatedElements.add(entry.target);

            // Apply stagger delay
            const delay = finalConfig.delay + (index * finalConfig.stagger);

            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, delay);
          }
        });
      },
      {
        threshold: finalConfig.threshold,
        rootMargin: finalConfig.rootMargin
      }
    );

    // Observe all reveal elements
    const revealSelectors = [
      '.reveal-fade',
      '.reveal-scale',
      '.reveal-slide-left',
      '.reveal-slide-right',
      '.reveal-slide-up',
      '.reveal-slide-down'
    ];

    revealSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => observer.observe(el));
    });

    this.observers.set('scroll-reveal', observer);
  }

  /**
   * Initialize staggered animations for child elements
   */
  initStaggeredAnimation(
    containerSelector: string,
    childSelector: string,
    config: AnimationConfig = {}
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.querySelector(containerSelector);
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    const staggerDelay = config.stagger || 100;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('revealed');
              }, index * staggerDelay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: config.threshold || 0.1,
        rootMargin: config.rootMargin || '0px 0px -50px 0px'
      }
    );

    observer.observe(container);
    this.observers.set(`stagger-${containerSelector}`, observer);
  }

  /**
   * Add floating animation to elements
   */
  addFloatingAnimation(selector: string, intensity: 'light' | 'medium' | 'heavy' = 'medium'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = document.querySelectorAll(selector);
    const animationClass = {
      light: 'floating-animation',
      medium: 'floating-delayed',
      heavy: 'floating-slow'
    }[intensity];

    elements.forEach(el => {
      el.classList.add(animationClass);
    });
  }

  /**
   * Add hover glow effect to elements
   */
  addHoverGlow(selector: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.add('hover-glow', 'transition-all', 'duration-300');
    });
  }

  /**
   * Create parallax effect for background elements
   */
  initParallaxEffect(selector: string, speed: number = 0.5): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const elements = document.querySelectorAll(selector);

    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      elements.forEach(el => {
        const rate = scrolled * speed;
        (el as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Animate counter numbers
   */
  animateCounter(
    element: Element,
    start: number,
    end: number,
    duration: number = 2000,
    easing: (t: number) => number = (t) => 1 - Math.pow(1 - t, 4)
  ): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);

      const current = Math.floor(start + (end - start) * easedProgress);
      element.textContent = current.toString();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  /**
   * Clean up all observers
   */
  cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.animatedElements.clear();
  }

  /**
   * Reset animations (useful for testing or re-triggering)
   */
  resetAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const revealElements = document.querySelectorAll('.revealed');
    revealElements.forEach(el => el.classList.remove('revealed'));
    this.animatedElements.clear();
  }
}
