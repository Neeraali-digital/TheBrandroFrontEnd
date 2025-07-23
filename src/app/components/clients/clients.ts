import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [],
  templateUrl: './clients.html'
})
export class Clients implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('clientStatsElement') clientStatsElement!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Animated counter signals
  happyClientsCount = signal(0);
  countriesCount = signal(0);
  campaignsCount = signal(0);
  retentionCount = signal(0);

  // Target values
  private readonly targets = {
    happyClients: 500,
    countries: 50,
    campaigns: 1000,
    retention: 98
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
      setTimeout(() => this.startCountAnimation(), 1500);
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

      if (this.clientStatsElement) {
        this.observer.observe(this.clientStatsElement.nativeElement);
      }
    } else {
      // Fallback for browsers without IntersectionObserver
      setTimeout(() => this.startCountAnimation(), 1500);
    }
  }

  private startCountAnimation() {
    // Check if we're in the browser environment
    if (typeof window === 'undefined' || typeof requestAnimationFrame === 'undefined') {
      // Fallback for SSR - just set the final values
      this.happyClientsCount.set(this.targets.happyClients);
      this.countriesCount.set(this.targets.countries);
      this.campaignsCount.set(this.targets.campaigns);
      this.retentionCount.set(this.targets.retention);
      return;
    }

    const duration = 2500; // 2.5 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      // Update counter values
      this.happyClientsCount.set(Math.floor(this.targets.happyClients * easeOutQuart));
      this.countriesCount.set(Math.floor(this.targets.countries * easeOutQuart));
      this.campaignsCount.set(Math.floor(this.targets.campaigns * easeOutQuart));
      this.retentionCount.set(Math.floor(this.targets.retention * easeOutQuart));

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }
}
