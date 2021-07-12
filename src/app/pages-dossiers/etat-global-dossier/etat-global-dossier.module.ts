import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatGlobalDossierPageRoutingModule } from './etat-global-dossier-routing.module';

import { EtatGlobalDossierPage } from './etat-global-dossier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatGlobalDossierPageRoutingModule
  ],
  declarations: [EtatGlobalDossierPage]
})
export class EtatGlobalDossierPageModule {}
