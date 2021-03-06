//import { Map } from 'rxjs/util/Map';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { PregisterPage } from '../pregister/pregister'; 
import { MapsPage} from '../maps/maps';

import { FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookshopPage } from '../bookshop/bookshop';
import { LoginssPage} from '../loginss/loginss';
import {PtabsPage} from '../ptabs/ptabs';
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
  private baseURI : string  = "http://10.45.24.44/vamsi/Authenti.php";
  public plogin:FormGroup;
  EMAIL:any;
  
  key:any;
  public itemsa:Array<any>=[];
  constructor(public navCtrl: NavController,private alertctrl:AlertController, public http: HttpClient,public formBuilder:FormBuilder, public navParams: NavParams) {
    this.plogin=this.formBuilder.group({ 
    Email:[''],
    word:[''],
  
    });

    
  }
  Map():void {
    let mailid          : string = this.plogin.controls["Email"].value,
        pass   : string   = this.plogin.controls["word"].value;
       this.createEntry(mailid,pass);
    
}
alert(message:string){
  this.alertctrl.create({
    title: 'Alert',
    subTitle: message,
    buttons: ['OK']
  }).present();
}
createEntry(mailid:string,pass:string){
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= {  "ID" : mailid,},
  url       : any      	= this.baseURI ;

this.http.post(url, JSON.stringify(options), headers)
.subscribe((data : any) =>
{
 
  console.log(data);
  
  this.itemsa=data;
  
  this.key=data.PASSWORD;
  
 if(data[0].PASSWORD==this.plogin.controls["word"].value && data[0].PASSWORD!="")
 {
   this.navCtrl.setRoot(PtabsPage,{emails:mailid});
  //this.navCtrl.setRoot(BookshopPage,{emails:mailid});
  //this.navCtrl.setRoot(LoginssPage,{emails:mailid});
   //this.navCtrl.push(PtabsPage,{emails:mailid});
 }

 else
 {
  this.alert('EMAIL OR PASSWORD IS INCORRECT');
 // this.navCtrl.setRoot(MapsPage,{emails:mailid});
 }
 
 //console.log(data);
},
(error : any) =>
{
 console.log({error});
 this.alert('EMAIL ID NOT REGISTERED');
});
}
Register() {
  this.navCtrl.push(PregisterPage);
}
volt():void{
  this.http
     .get('http://localhost/vamsi/Authenti.php')
     .subscribe((data : any) =>
     {
        console.log(data);
       this.itemsa=data;
       
       console.log(this.itemsa);
       
     
     },
     (error : any) =>
     {
        console.dir(error);
        this.navCtrl.setRoot(PloginPage);
     });
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PloginPage');
  }

}
