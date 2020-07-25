import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero'
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.less']
})
export class HeroComponent implements OnInit {

  heroes: Hero[] = [
    { id: 11, name: 'Dr Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ]
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    // this.getHeroes()
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes().subscribe(res => {
  //     this.heroes = res
  //   });
  // }
}
