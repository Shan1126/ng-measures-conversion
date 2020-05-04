import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitConversionComponent } from './unit-conversion/unit-conversion.component';

const routes: Routes = [
  { path: '', component: UnitConversionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
