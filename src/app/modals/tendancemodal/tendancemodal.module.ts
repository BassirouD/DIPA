import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TendancemodalPageRoutingModule } from './tendancemodal-routing.module';

import { TendancemodalPage } from './tendancemodal.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TendancemodalPageRoutingModule,
    ChartModule
  ],
  declarations: [TendancemodalPage]
})
export class TendancemodalPageModule {}
