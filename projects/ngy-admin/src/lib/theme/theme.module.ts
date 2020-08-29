import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSelectorComponent } from './theme-selector/theme-selector.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';



// @dynamic
@NgModule({
  declarations: [ThemeSelectorComponent],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  exports: [ThemeSelectorComponent],
})
export class ThemeModule { }
