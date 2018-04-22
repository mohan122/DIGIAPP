import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterItemsPage } from './register-items';

@NgModule({
  declarations: [
    RegisterItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterItemsPage),
  ],
})
export class RegisterItemsPageModule {}
