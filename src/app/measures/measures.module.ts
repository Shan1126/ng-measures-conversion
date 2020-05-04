import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitConversionComponent } from './unit-conversion/unit-conversion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';



@NgModule({
  declarations: [UnitConversionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [UnitConversionComponent]
})
export class MeasuresModule { }
