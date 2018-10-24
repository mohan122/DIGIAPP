import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
/**
 * Generated class for the SvrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-svr',
  templateUrl: 'svr.html',
})
export class SvrPage {
  svss:{};
  options:{};
  phone:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  }
  sccan(){
    this.options = {
      prompt : "Scan your barcode "
  }
  this.barcodeScanner.scan(this.options).then(barcodeData => {
    console.log('Barcode data', barcodeData);
    this.svss=barcodeData;
   }).catch(err => {
       console.log('Error', err);
   });


  

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SvrPage');
  }

}
