import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableComponent } from 'ng-zorro-antd/table';

import { TestRoutingModule } from './test-routing.module';
import { NzDemoTableVirtualComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [NzDemoTableVirtualComponent],
  imports: [
    CommonModule,
    TestRoutingModule,NzTableModule
  ]
})
export class TestModule { }
