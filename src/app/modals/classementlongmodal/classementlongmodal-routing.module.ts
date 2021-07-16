import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassementlongmodalPage } from './classementlongmodal.page';

const routes: Routes = [
  {
    path: '',
    component: ClassementlongmodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassementlongmodalPageRoutingModule {}
