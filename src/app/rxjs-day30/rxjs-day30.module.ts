import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RxjsDay30RoutingModule } from './rxjs-day30-routing.module';
import { ObserveComponent } from './observe/observe.component';


@NgModule({
  declarations: [ObserveComponent],
  imports: [
    CommonModule,
    RxjsDay30RoutingModule
  ]
})
export class RxjsDay30Module { }
