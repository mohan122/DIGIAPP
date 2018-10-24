import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookshopPage } from './bookshop';

@NgModule({
  declarations: [
    BookshopPage,
  ],
  imports: [
    IonicPageModule.forChild(BookshopPage),
  ],
})
export class BookshopPageModule {}
