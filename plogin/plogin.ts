import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterPage } from '../register/register'; 
import { MapsPage} from '../maps/maps';

/**
 * Generated class for the PloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plogin',
  templateUrl: 'plogin.html',
})
export class PloginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Register() {
    this.navCtrl.push(RegisterPage);
}
Map() {
  this.navCtrl.setRoot(MapsPage);
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PloginPage');
  }

}
