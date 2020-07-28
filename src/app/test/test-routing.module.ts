import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NzDemoTableVirtualComponent } from './table/table.component';

const routes: Routes = [
  {
    path:'tableTest',
    component:NzDemoTableVirtualComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
