import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationImportArticlePageRoutingModule } from './estimation-import-article-routing.module';

import { EstimationImportArticlePage } from './estimation-import-article.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimationImportArticlePageRoutingModule
  ],
  declarations: [EstimationImportArticlePage]
})
export class EstimationImportArticlePageModule {}
