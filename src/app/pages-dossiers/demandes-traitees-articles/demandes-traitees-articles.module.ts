import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DemandesTraiteesArticlesPageRoutingModule } from './demandes-traitees-articles-routing.module';

import { DemandesTraiteesArticlesPage } from './demandes-traitees-articles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DemandesTraiteesArticlesPageRoutingModule
  ],
  declarations: [DemandesTraiteesArticlesPage]
})
export class DemandesTraiteesArticlesPageModule {}
