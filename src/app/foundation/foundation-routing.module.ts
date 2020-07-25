import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectiveComponent } from './directive/directive.component';

const routes: Routes = [
  {
    path:'DirectiveTest',
    component:DirectiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoundationRoutingModule { }
