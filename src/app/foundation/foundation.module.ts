import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundationRoutingModule } from './foundation-routing.module';
import { DirectiveComponent } from './directive/directive.component';
import { HighlightDirective } from './directive/highlight.directive';


@NgModule({
  declarations: [DirectiveComponent, HighlightDirective],
  imports: [
    CommonModule,
    FoundationRoutingModule
  ]
})
export class FoundationModule { }
