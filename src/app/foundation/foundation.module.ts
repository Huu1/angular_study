import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoundationRoutingModule } from './foundation-routing.module';
import { DirectiveComponent } from './directive/directive.component';
import { HighlightDirective } from './directive/highlight.directive';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';

@NgModule({
  declarations: [DirectiveComponent, HighlightDirective, FormComponent, ProfileEditorComponent],
  imports: [
    CommonModule,
    FoundationRoutingModule,
    ReactiveFormsModule
  ]
})
export class FoundationModule { }
