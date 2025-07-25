import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html'
})
export class Header {
  isMobileMenuOpen = false;

  navigationItems = [
    { label: 'Home', href: '#home', icon: 'home' },
    { label: 'Services', href: '#services', icon: 'services' },
    { label: 'Portfolio', href: '#portfolio', icon: 'portfolio' },
    { label: 'Contact', href: '#contact', icon: 'contact' }
  ];

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
