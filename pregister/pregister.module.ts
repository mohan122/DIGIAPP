import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PregisterPage } from './pregister';

@NgModule({
  declarations: [
    PregisterPage,
  ],
  imports: [
    IonicPageModule.forChild(PregisterPage),
  ],
})
export class PregisterPageModule {}
