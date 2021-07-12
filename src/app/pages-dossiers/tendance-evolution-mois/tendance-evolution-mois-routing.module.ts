import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendanceEvolutionMoisPage } from './tendance-evolution-mois.page';

const routes: Routes = [
  {
    path: '',
    component: TendanceEvolutionMoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendanceEvolutionMoisPageRoutingModule {}
