import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabhPage } from './tabh';

@NgModule({
  declarations: [
    TabhPage,
  ],
  imports: [
    IonicPageModule.forChild(TabhPage),
  ]
})
export class TabhPageModule {}
