import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimationImportMoisPage } from './estimation-import-mois.page';

const routes: Routes = [
  {
    path: '',
    component: EstimationImportMoisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimationImportMoisPageRoutingModule {}
