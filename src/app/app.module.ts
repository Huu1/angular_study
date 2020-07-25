import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyHerosModule } from './my-heros/my-heros.module';
import { HomeModule } from './home/home.module';
import { FoundationModule } from './foundation/foundation.module';
import { MapModule } from './map/map.module';

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
    MapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
