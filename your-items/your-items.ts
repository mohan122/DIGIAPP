import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the YourItemsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-your-items',
  templateUrl: 'your-items.html',
})
export class YourItemsPage {
  public items : Array<any> = [];
  public itemsa:Array<any>=[];
  public isKgsSelected: boolean;
public isPiecesSelected: boolean;

  constructor(public navCtrl: NavController,private alertctrl:AlertController, public navParams: NavParams,public http   : HttpClient) {
  }
  Logout(){
    this.navCtrl.setRoot(LoginPage);
  }
  selectItem(Mode)
 {
     if(Mode == 'Kgs')
     {
         this.isPiecesSelected = false;
         this.isKgsSelected = true;
     }
     else if(Mode == 'Pieces')
     {
         this.isKgsSelected = false;
         this.isPiecesSelected = true;
     }
 }
 cancel()
 {
     this.isKgsSelected = false;
     this.isPiecesSelected = false;
 }
 alert(message:string){
  this.alertctrl.create({
    title: 'Alert',
    subTitle: message,
    buttons: ['OK']
  }).present();
}




  ionViewWillEnter() : void
  {
     this.load();
     this.load1();
  }
  load() : void
   {
      this.http
      .get('http://localhost/vamsi/itrv.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
         this.alert('No Items Published from this Account');
      });
   }

   load1() : void
   {
      this.http
      .get('http://localhost/vamsi/itemretrivek.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.itemsa = data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad YourItemsPage');
  }

}
