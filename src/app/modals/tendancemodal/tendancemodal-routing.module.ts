import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TendancemodalPage } from './tendancemodal.page';

const routes: Routes = [
  {
    path: '',
    component: TendancemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TendancemodalPageRoutingModule {}
