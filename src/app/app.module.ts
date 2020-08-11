import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHerosModule } from './my-heros/my-heros.module';
import { HomeModule } from './home/home.module';
import { FoundationModule } from './foundation/foundation.module';
import { MapModule } from './map/map.module';
import { TestModule } from './test/test.module';
import { RxjsDay30Module } from './rxjs-day30/rxjs-day30.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyHerosModule,
    CommonModule,
    HomeModule,
    FoundationModule,
    MapModule,
    TestModule,
    RxjsDay30Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
