import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerformanceCompareePage } from './performance-comparee.page';

const routes: Routes = [
  {
    path: '',
    component: PerformanceCompareePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerformanceCompareePageRoutingModule {}
