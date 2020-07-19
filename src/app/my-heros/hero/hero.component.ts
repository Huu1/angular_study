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
  
  heroes: Hero[] = []
  constructor(private heroService: HeroService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes()
  }
  
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(res => {
      this.heroes = res
    });
  }
}
