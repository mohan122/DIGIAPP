import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PurchasedordersPage } from './purchasedorders';

@NgModule({
  declarations: [
    PurchasedordersPage,
  ],
  imports: [
    IonicPageModule.forChild(PurchasedordersPage),
  ],
})
export class PurchasedordersPageModule {}
