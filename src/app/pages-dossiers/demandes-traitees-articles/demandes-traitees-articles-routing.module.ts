import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DemandesTraiteesArticlesPage } from './demandes-traitees-articles.page';

const routes: Routes = [
  {
    path: '',
    component: DemandesTraiteesArticlesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DemandesTraiteesArticlesPageRoutingModule {}
