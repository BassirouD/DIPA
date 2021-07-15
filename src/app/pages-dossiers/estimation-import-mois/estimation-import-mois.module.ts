import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationImportMoisPageRoutingModule } from './estimation-import-mois-routing.module';

import { EstimationImportMoisPage } from './estimation-import-mois.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimationImportMoisPageRoutingModule,
    ChartModule
  ],
  declarations: [EstimationImportMoisPage]
})
export class EstimationImportMoisPageModule {}
