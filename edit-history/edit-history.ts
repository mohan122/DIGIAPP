import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the EditHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-history',
  templateUrl: 'edit-history.html',
})
export class EditHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditHistoryPage');
  }

}
