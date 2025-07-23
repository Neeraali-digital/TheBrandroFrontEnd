import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { Clients } from '../../components/clients/clients';
import { Services } from '../../components/services/services';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-landing',
  imports: [Header, Hero, Clients, Services, Footer],
  templateUrl: './landing.html'
})
export class Landing {

}
