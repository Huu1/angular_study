import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FeatureRoutingModule } from "./chart-routing.module";
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule
  ]
})
export class ChatModule { }
