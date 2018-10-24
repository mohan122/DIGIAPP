import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HellosPage } from './hellos';

@NgModule({
  declarations: [
    HellosPage,
  ],
  imports: [
    IonicPageModule.forChild(HellosPage),
  ],
})
export class HellosPageModule {}
