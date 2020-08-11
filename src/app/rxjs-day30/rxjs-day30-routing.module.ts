import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObserveComponent } from './observe/observe.component';


const routes: Routes = [
  {
    path: "observe",
    component: ObserveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RxjsDay30RoutingModule { }
