import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
private baseURIp : string  = "http://192.168.0.8/vamsi/itrv.php";

  constructor(public navCtrl: NavController,private alertctrl:AlertController, public navParams: NavParams,public http   : HttpClient) {
    console.log('Passed params', navParams.data);
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
    let name:string=this.navParams.data;
     this.load(name);
     this.load1();
  }
  load(name) : void
   {
   
       let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
           options 	: any		= {"key":"create", "mail":name },
           url       : any      	= this.baseURIp ;
    
       this.http.post(url, JSON.stringify(options), headers)
       .subscribe((data : any) =>
       {
          // If the request was successful notify the user
       
          console.log(data);
          this.items = data;
        
       },
       (error : any) =>
       {
          console.log({error});
       });
    }
    
    
     /* this.http
      .get('http://192.168.0.8/vamsi/itrv.php')
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
      },
      (error : any) =>
      {
         console.dir(error);
         this.alert('No Items Published from this Account');
      });*/
   

   load1() : void
   {
      this.http
      .get('http://192.168.0.8/vamsi/itemretrivek.php')
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
