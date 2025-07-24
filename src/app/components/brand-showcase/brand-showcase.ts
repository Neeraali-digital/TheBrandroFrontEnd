import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-showcase',
  imports: [CommonModule],
  templateUrl: './brand-showcase.html',
  styleUrls: ['./brand-showcase.css']
})
export class BrandShowcase implements OnInit, OnDestroy {
  currentSlide = 0;
  slides = [
    {
      id: 0,
      title: 'PR Strategy & Media Relations',
      type: 'strategy',
      gradient: 'from-blue-600 to-purple-600',
      brands: ['Media Relations', 'Crisis Management', 'Brand Positioning', 'Strategic Planning']
    },
    {
      id: 1,
      title: 'Luxury Brand Collaboration',
      type: 'luxury',
      gradient: 'from-amber-700 to-red-800',
      brands: ['Luxe Elite', 'Prestige', 'Royal Craft', 'Elegance']
    },
    {
      id: 2,
      title: 'Fashion & Lifestyle Partners',
      type: 'fashion',
      gradient: 'from-pink-600 to-purple-700',
      brands: ['Fashionista', 'Urban Style', 'Vogue Plus', 'Trendsetter']
    },
    {
      id: 3,
      title: 'Eco-Friendly Partnerships',
      type: 'sustainable',
      gradient: 'from-green-600 to-teal-600',
      brands: ['EcoLife', 'GreenTech', 'Sustain Co', 'Terra Pure']
    },
    {
      id: 4,
      title: 'PR Branding Video Insights',
      type: 'video',
      gradient: 'from-red-600 to-red-800',
      brands: ['Strategic Positioning', 'Crisis Communication', 'Digital Innovation', 'Brand Mastery']
    }
  ];

  private slideInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  getDotClass(index: number): string {
    return this.currentSlide === index 
      ? 'bg-white shadow-lg scale-125' 
      : 'bg-white/50 hover:bg-white/75';
  }

  private startAutoSlide(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  private stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
