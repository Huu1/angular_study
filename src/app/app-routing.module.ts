import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeContinerComponent } from './home/home-continer/home-continer.component';

const routes: Routes = [
  {
    path: "",
    component:HomeContinerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
