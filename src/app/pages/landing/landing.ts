import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { BrandShowcase } from '../../components/brand-showcase/brand-showcase';
import { Hero } from '../../components/hero/hero';
import { Clients } from '../../components/clients/clients';
import { Services } from '../../components/services/services';
import { Gallery } from '../../components/gallery/gallery';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [Header, BrandShowcase, Hero, Clients, Services, Gallery, Footer],
  templateUrl: './landing.html'
})
export class Landing {

}
