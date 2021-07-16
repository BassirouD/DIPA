import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClassementlongmodalPageRoutingModule } from './classementlongmodal-routing.module';

import { ClassementlongmodalPage } from './classementlongmodal.page';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClassementlongmodalPageRoutingModule,
    ChartModule
  ],
  declarations: [ClassementlongmodalPage]
})
export class ClassementlongmodalPageModule {}
