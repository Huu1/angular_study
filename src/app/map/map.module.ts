import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { MapRoutingModule } from './map-routing.module';
import { MapInsantanceComponent } from './map-insantance/map-insantance.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [MapInsantanceComponent, MapContainerComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    NzCheckboxModule,
    FormsModule
  ]
})
export class MapModule { }
