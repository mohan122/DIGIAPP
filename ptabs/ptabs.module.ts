import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PtabsPage } from './ptabs';

@NgModule({
  declarations: [
    PtabsPage,
  ],
  imports: [
    IonicPageModule.forChild(PtabsPage),
  ],
})
export class PtabsPageModule {}
