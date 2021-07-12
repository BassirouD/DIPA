import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendanceEvolutionMoisPageRoutingModule } from './tendance-evolution-mois-routing.module';

import { TendanceEvolutionMoisPage } from './tendance-evolution-mois.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendanceEvolutionMoisPageRoutingModule
  ],
  declarations: [TendanceEvolutionMoisPage]
})
export class TendanceEvolutionMoisPageModule {}
