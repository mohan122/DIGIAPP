import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { PloginPage} from '../plogin/plogin';

/**
 * Generated class for the RetloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-retlogin',
  templateUrl: 'retlogin.html',
})
export class RetloginPage {
 
  splash=true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  PLogin() {
    this.navCtrl.push(PloginPage);
}
  Login(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    setTimeout(()=>{
      this.splash=false;
    },4500);
    console.log('ionViewDidLoad RetloginPage');
  }

}
