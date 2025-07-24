import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html'
})
export class Hero implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('statsElement') statsElement!: ElementRef;
  @ViewChild('slidesContainer') slidesContainer!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  // Animated counter signals
  clientsCount = signal(0);
  experienceCount = signal(0);
  successCount = signal(0);

  // Dynamic content signals
  currentHighlight = signal(0);
  isVisible = signal(false);

  // Carousel properties
  currentSlide = 0;
  slides = [
    { id: 0, title: 'Our Clients', type: 'clients' },
    { id: 1, title: 'Success Stories', type: 'success' },
    { id: 2, title: 'Awards & Recognition', type: 'awards' }
  ];
  private slideInterval: any;

  // Target values
  private readonly targets = {
    clients: 500,
    experience: 15,
    success: 98
  };

  // Dynamic highlights for the description
  highlights = [
    { text: 'strategic public relations', color: 'text-brand-accent' },
    { text: 'media management', color: 'text-gradient-success' },
    { text: 'reputation excellence', color: 'text-gradient-warning' }
  ];

  private animationFrameId: number | null = null;
  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    // Component initialization
    this.startHighlightCycle();
    this.startAutoSlide();
  }

  private startHighlightCycle(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Cycle through highlights every 3 seconds
    setInterval(() => {
      this.currentHighlight.set((this.currentHighlight() + 1) % this.highlights.length);
    }, 3000);
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
    this.stopAutoSlide();
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

  // Interactive methods
  scrollToPortfolio(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const portfolioElement = document.getElementById('portfolio');
    if (portfolioElement) {
      portfolioElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  scrollToContact(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  openContactModal(): void {
    // This would open a contact modal in a real implementation
    console.log('Opening contact modal...');
  }

  // Carousel methods
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  getDotClass(index: number): string {
    return this.currentSlide === index
      ? 'bg-brand-accent shadow-glow'
      : 'bg-gray-300 hover:bg-brand-accent/50';
  }

  private startAutoSlide(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  private stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  getCurrentHighlight(): string {
    return this.highlights[this.currentHighlight()]?.text || '';
  }

  getCurrentHighlightColor(): string {
    return this.highlights[this.currentHighlight()]?.color || 'text-brand-accent';
  }
}
