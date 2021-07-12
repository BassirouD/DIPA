import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerformanceCompareePageRoutingModule } from './performance-comparee-routing.module';

import { PerformanceCompareePage } from './performance-comparee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerformanceCompareePageRoutingModule
  ],
  declarations: [PerformanceCompareePage]
})
export class PerformanceCompareePageModule {}
