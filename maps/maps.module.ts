import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapsPage } from './maps';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MapsPage,
  ],
  imports: [
    IonicPageModule.forChild(MapsPage),
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyDeMjFd459tC-fSBnQ4fLhxHnLxd7b1I5E'
    })
  ],
})
export class MapsPageModule {}
