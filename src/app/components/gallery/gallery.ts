import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { signal } from '@angular/core';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  likes: number;
  views: number;
  metrics?: { label: string; value: string }[];
}

interface Category {
  id: string;
  name: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class Gallery implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('galleryItem') galleryItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  // Gallery state
  selectedItem: GalleryItem | null = null;
  activeCategory = signal<string>('all');
  currentPage = signal<number>(1);
  itemsPerPage = 12;
  hasMoreItems = signal<boolean>(true);

  // Categories for filtering
  categories: Category[] = [
    { id: 'all', name: 'All' },
    { id: 'brand-campaigns', name: 'Brand Campaigns' },
    { id: 'crisis-management', name: 'Crisis Management' },
    { id: 'influencer', name: 'Influencer Relations' },
    { id: 'media-coverage', name: 'Media Coverage' },
    { id: 'awards', name: 'Awards & Recognition' },
    { id: 'events', name: 'Event Management' }
  ];

  // Sample gallery data (in real app, this would come from a service)
  private allGalleryItems: GalleryItem[] = [
    {
      id: 1,
      title: 'TechCorp Global Product Launch',
      description: 'Orchestrated a worldwide product launch campaign that generated unprecedented media coverage and consumer engagement.',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=600&fit=crop',
      category: 'brand-campaigns',
      likes: 2847,
      views: 15632,
      metrics: [
        { label: 'Media Mentions', value: '2,500+' },
        { label: 'Reach', value: '50M+' },
        { label: 'Engagement', value: '890%' },
        { label: 'ROI', value: '450%' }
      ]
    },
    {
      id: 2,
      title: 'Crisis Communication Excellence',
      description: 'Successfully managed a complex crisis situation, maintaining brand reputation and stakeholder confidence.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
      category: 'crisis-management',
      likes: 1923,
      views: 8745,
      metrics: [
        { label: 'Response Time', value: '2 hours' },
        { label: 'Sentiment Recovery', value: '95%' },
        { label: 'Media Coverage', value: 'Positive' },
        { label: 'Stakeholder Trust', value: '98%' }
      ]
    },
    {
      id: 3,
      title: 'Influencer Partnership Campaign',
      description: 'Created authentic partnerships with top-tier influencers resulting in massive brand awareness growth.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=600&fit=crop',
      category: 'influencer',
      likes: 3456,
      views: 22341,
      metrics: [
        { label: 'Influencers', value: '150+' },
        { label: 'Total Reach', value: '75M+' },
        { label: 'Engagement Rate', value: '12.5%' },
        { label: 'Conversions', value: '25,000+' }
      ]
    },
    {
      id: 4,
      title: 'Award-Winning PR Campaign',
      description: 'Innovative campaign that won multiple industry awards and set new standards for creative PR execution.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=600&fit=crop',
      category: 'awards',
      likes: 4123,
      views: 18967,
      metrics: [
        { label: 'Awards Won', value: '8' },
        { label: 'Industry Recognition', value: '100%' },
        { label: 'Media Coverage', value: '500+' },
        { label: 'Brand Lift', value: '340%' }
      ]
    },
    {
      id: 5,
      title: 'Global Media Coverage Success',
      description: 'Secured extensive international media coverage across major publications and broadcast networks.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=600&fit=crop',
      category: 'media-coverage',
      likes: 2789,
      views: 13456,
      metrics: [
        { label: 'Publications', value: '200+' },
        { label: 'Countries', value: '45' },
        { label: 'Impressions', value: '100M+' },
        { label: 'Share of Voice', value: '85%' }
      ]
    },
    {
      id: 6,
      title: 'Exclusive Event Management',
      description: 'Managed high-profile corporate events that strengthened client relationships and generated significant buzz.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=600&fit=crop',
      category: 'events',
      likes: 1876,
      views: 9234,
      metrics: [
        { label: 'Attendees', value: '5,000+' },
        { label: 'VIP Guests', value: '200+' },
        { label: 'Media Present', value: '50+' },
        { label: 'Social Mentions', value: '10,000+' }
      ]
    },
    {
      id: 7,
      title: 'Digital Transformation Campaign',
      description: 'Led a comprehensive digital transformation campaign that revolutionized brand presence across all digital platforms.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop',
      category: 'brand-campaigns',
      likes: 3892,
      views: 28456,
      metrics: [
        { label: 'Digital Reach', value: '120M+' },
        { label: 'Engagement Rate', value: '18.5%' },
        { label: 'Brand Mentions', value: '50,000+' },
        { label: 'Conversion Lift', value: '280%' }
      ]
    },
    {
      id: 8,
      title: 'Celebrity Endorsement Success',
      description: 'Orchestrated high-profile celebrity partnerships that elevated brand visibility and credibility in the market.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=600&fit=crop',
      category: 'influencer',
      likes: 5234,
      views: 34567,
      metrics: [
        { label: 'Celebrity Partners', value: '25+' },
        { label: 'Media Value', value: '$15M+' },
        { label: 'Social Reach', value: '200M+' },
        { label: 'Brand Lift', value: '450%' }
      ]
    },
    {
      id: 9,
      title: 'International Media Blitz',
      description: 'Coordinated simultaneous media launches across 30 countries, creating unprecedented global brand awareness.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop',
      category: 'media-coverage',
      likes: 4156,
      views: 19876,
      metrics: [
        { label: 'Countries', value: '30' },
        { label: 'Media Outlets', value: '500+' },
        { label: 'Languages', value: '15' },
        { label: 'Global Reach', value: '300M+' }
      ]
    },
    {
      id: 10,
      title: 'Sustainability PR Initiative',
      description: 'Developed and executed a groundbreaking sustainability campaign that positioned the brand as an environmental leader.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=600&fit=crop',
      category: 'brand-campaigns',
      likes: 2987,
      views: 16543,
      metrics: [
        { label: 'Environmental Impact', value: '50% Reduction' },
        { label: 'Positive Sentiment', value: '94%' },
        { label: 'Award Recognition', value: '12 Awards' },
        { label: 'Industry Leadership', value: '#1 Ranking' }
      ]
    },
    {
      id: 11,
      title: 'Product Launch Spectacular',
      description: 'Created an immersive product launch experience that generated massive buzz and exceeded all sales projections.',
      image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=600&fit=crop',
      category: 'events',
      likes: 3654,
      views: 22109,
      metrics: [
        { label: 'Launch Events', value: '15 Cities' },
        { label: 'Media Coverage', value: '1,000+' },
        { label: 'Sales Increase', value: '320%' },
        { label: 'Social Buzz', value: '500K Mentions' }
      ]
    },
    {
      id: 12,
      title: 'Crisis Recovery Excellence',
      description: 'Successfully navigated a major brand crisis, restoring public trust and emerging stronger than before.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
      category: 'crisis-management',
      likes: 2743,
      views: 14321,
      metrics: [
        { label: 'Response Time', value: '1 Hour' },
        { label: 'Trust Recovery', value: '98%' },
        { label: 'Positive Coverage', value: '85%' },
        { label: 'Stock Recovery', value: '110%' }
      ]
    }
  ];

  // Computed properties
  get filteredGalleryItems(): GalleryItem[] {
    const filtered = this.activeCategory() === 'all'
      ? this.allGalleryItems
      : this.allGalleryItems.filter(item => item.category === this.activeCategory());

    return filtered.slice(0, this.currentPage() * this.itemsPerPage);
  }

  private observer: IntersectionObserver | null = null;

  ngOnInit() {
    this.updateHasMoreItems();
  }

  ngAfterViewInit() {
    this.setupScrollRevealAnimations();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

  }

  // Category filtering methods
  setActiveCategory(category: Category): void {
    this.activeCategory.set(category.id);
    this.currentPage.set(1);
    this.updateHasMoreItems();
  }

  getFilterButtonClass(category: Category): string {
    const baseClasses = 'glass-card hover-lift';
    const activeClasses = 'bg-gradient-to-r from-brand-accent to-brand-accent-end text-white shadow-glow';
    const inactiveClasses = 'bg-glass-white text-brand-primary hover:bg-glass-light';

    return this.activeCategory() === category.id
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  }

  // Grid layout methods
  getGridItemClass(index: number): string {
    // Create masonry-like layout for larger screens
    const baseClasses = 'hover-lift hover-scale';

    // Add special sizing for featured items
    if (index === 0 || index === 5) {
      return `${baseClasses} sm:col-span-2 sm:row-span-2`;
    }

    return baseClasses;
  }

  getCategoryBadgeClass(category: string): string {
    const baseClasses = 'text-white';

    switch (category) {
      case 'brand-campaigns':
        return `${baseClasses} bg-gradient-to-r from-service-purple to-service-indigo`;
      case 'crisis-management':
        return `${baseClasses} bg-gradient-to-r from-service-rose to-service-orange`;
      case 'influencer':
        return `${baseClasses} bg-gradient-to-r from-service-pink to-service-purple`;
      case 'media-coverage':
        return `${baseClasses} bg-gradient-to-r from-service-cyan to-service-teal`;
      case 'awards':
        return `${baseClasses} bg-gradient-to-r from-gradient-warning to-gradient-success`;
      case 'events':
        return `${baseClasses} bg-gradient-to-r from-service-indigo to-service-cyan`;
      default:
        return `${baseClasses} bg-gradient-to-r from-brand-accent to-brand-accent-end`;
    }
  }

  getMobileFilterName(name: string): string {
    const mobileNames: { [key: string]: string } = {
      'All': 'All',
      'Brand Campaigns': 'Brand',
      'Crisis Management': 'Crisis',
      'Influencer Relations': 'Influencer',
      'Media Coverage': 'Media',
      'Awards & Recognition': 'Awards',
      'Event Management': 'Events'
    };

    return mobileNames[name] || name;
  }

  getTruncatedTitle(title: string): string {
    return title.length > 20 ? title.substring(0, 20) + '...' : title;
  }

  // Modal methods
  openModal(item: GalleryItem): void {
    this.selectedItem = item;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.selectedItem = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
    }
  }

  // Pagination methods
  loadMore(): void {
    this.currentPage.set(this.currentPage() + 1);
    this.updateHasMoreItems();
  }

  private updateHasMoreItems(): void {
    const totalFiltered = this.activeCategory() === 'all'
      ? this.allGalleryItems.length
      : this.allGalleryItems.filter(item => item.category === this.activeCategory()).length;

    this.hasMoreItems.set(this.currentPage() * this.itemsPerPage < totalFiltered);
  }

  // Animation setup
  private setupScrollRevealAnimations(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal-fade, .reveal-scale, .reveal-slide-left, .reveal-slide-right');
    revealElements.forEach((el) => {
      this.observer?.observe(el);
    });
  }
}
