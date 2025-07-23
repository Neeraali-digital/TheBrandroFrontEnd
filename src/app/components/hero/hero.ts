import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html'
})
export class Hero implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('statsElement') statsElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // Animated counter signals
  clientsCount = signal(0);
  experienceCount = signal(0);
  successCount = signal(0);

  // Target values
  private readonly targets = {
    clients: 500,
    experience: 15,
    success: 98
  };

  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    if (!isPlatformBrowser(this.platformId)) {
      // Start animation immediately on server-side rendering
      setTimeout(() => this.startCountAnimation(), 1000);
      return;
    }

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.startCountAnimation();
              this.observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (this.statsElement) {
        this.observer.observe(this.statsElement.nativeElement);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => this.startCountAnimation(), 1000);
    }
  }

  private startCountAnimation() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') {
      // Fallback for SSR - just set the final values
      this.clientsCount.set(this.targets.clients);
      this.experienceCount.set(this.targets.experience);
      this.successCount.set(this.targets.success);
      return;
    }

    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Update counter values
      this.clientsCount.set(Math.floor(this.targets.clients * easeOutQuart));
      this.experienceCount.set(Math.floor(this.targets.experience * easeOutQuart));
      this.successCount.set(Math.floor(this.targets.success * easeOutQuart));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
