import { Routes } from '@angular/router';

export const routes: Routes = [
  // Landing page route
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing),
    title: 'The Brandro - World\'s #1 PR Brand'
  },

  // Future routes for scaling
  {
    path: 'about',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing), // Placeholder for now
    title: 'About Us - The Brandro'
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing), // Placeholder for now
    title: 'Our Services - The Brandro'
  },
  {
    path: 'case-studies',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing), // Placeholder for now
    title: 'Case Studies - The Brandro'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing), // Placeholder for now
    title: 'Contact Us - The Brandro'
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/landing/landing').then(m => m.Landing), // Placeholder for now
    title: 'Blog - The Brandro'
  },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: ''
  }
];
