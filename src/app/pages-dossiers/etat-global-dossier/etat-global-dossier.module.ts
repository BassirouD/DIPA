import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtatGlobalDossierPageRoutingModule } from './etat-global-dossier-routing.module';

import { EtatGlobalDossierPage } from './etat-global-dossier.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtatGlobalDossierPageRoutingModule,
    ChartModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [EtatGlobalDossierPage]
})
export class EtatGlobalDossierPageModule {}
