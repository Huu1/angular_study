import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyHerosRoutingModule } from './my-heros-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './hero/hero.component';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [HeroesComponent, HeroComponent, HeroDetailComponent, MessagesComponent, DashboardComponent],
  imports: [
    CommonModule,
    MyHerosRoutingModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class MyHerosModule { }
