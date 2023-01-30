import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';

import { StepperComponent } from './stepper.component';

@NgModule({
  declarations: [StepperComponent],
  exports: [StepperComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StepperModule {}
