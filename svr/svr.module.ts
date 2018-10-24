import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SvrPage } from './svr';

@NgModule({
  declarations: [
    SvrPage,
  ],
  imports: [
    IonicPageModule.forChild(SvrPage),
  ],
})
export class SvrPageModule {}
