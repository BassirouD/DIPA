import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimationImportArticlePage } from './estimation-import-article.page';

const routes: Routes = [
  {
    path: '',
    component: EstimationImportArticlePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimationImportArticlePageRoutingModule {}
