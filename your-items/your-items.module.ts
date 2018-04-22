import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { YourItemsPage } from './your-items';

@NgModule({
  declarations: [
    YourItemsPage,
  ],
  imports: [
    IonicPageModule.forChild(YourItemsPage),
  ],
})
export class YourItemsPageModule {}
