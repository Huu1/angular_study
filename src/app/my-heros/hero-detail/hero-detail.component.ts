import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.less']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    // ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。 
    private heroService: HeroService,
    private location: Location
  ) { }

  @Input() hero: Hero
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
  }
  goBack(): void {
    this.location.back();
  }
}
