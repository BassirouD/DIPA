import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendanceEvolutionMoisPageRoutingModule } from './tendance-evolution-mois-routing.module';

import { TendanceEvolutionMoisPage } from './tendance-evolution-mois.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendanceEvolutionMoisPageRoutingModule,
    ChartModule
  ],
  declarations: [TendanceEvolutionMoisPage]
})
export class TendanceEvolutionMoisPageModule {}
