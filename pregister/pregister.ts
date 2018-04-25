import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PloginPage } from '../plogin/plogin';


/**
 * Generated class for the PregisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pregister',
  templateUrl: 'pregister.html',
})
export class PregisterPage {
 
  public pregister:FormGroup;
  private baseURI : string  = "http://localhost/vamsi/pregister.php";
  constructor(public navCtrl: NavController,private alertctrl:AlertController,public formBuilder:FormBuilder,public http: HttpClient, public navParams: NavParams) {
    this.pregister=this.formBuilder.group({ 
      name:[''],
      mobile:[''],
      password:[''],
      retypepassword:[''],
      address:[''],
      streetname:[''],
      city:[''],
      pincode:[''],
      });
  
  }
  registerUse(){
    let name          : string = this.pregister.controls["name"].value,
    mobile   : number  = this.pregister.controls["mobile"].value,
    password          : string = this.pregister.controls["password"].value,
    retypepassword   : string   = this.pregister.controls["retypepassword"].value,
    address          : string = this.pregister.controls["address"].value,
    streetname   : string   = this.pregister.controls["streetname"].value,
    city         : string = this.pregister.controls["city"].value,
    pincode   : number  = this.pregister.controls["pincode"].value;
    
    
    this.createEntry(name,mobile,password,retypepassword,address,streetname,city,pincode);
    
  }
  createEntry(name:string,mobile:number,password:string,retypepassword:string,address:string,streetname:string,city:string,pincode:number){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= { "key" : "create", "email" : name,"mobile" :mobile,"password":password,"retypepassword":retypepassword,"address":address,"streetname":streetname,"city":city,"pincode":pincode},
    url       : any      	= this.baseURI ;
  
  this.http.post(url, JSON.stringify(options), headers)
  .subscribe((data : any) =>
  {
   // If the request was successful notify the user
  
   console.log(`Congratulations the ${name} was successfully added`);
   this.navCtrl.push(PloginPage);
   this.alert('Regitered Succeesfully');
  },
  (error : any) =>
  {
   console.log('Something went wrong!');
   this.navCtrl.push(PregisterPage);
   this.alert('Not Regitered Succeesfully');
  });
  }
  alert(message:string){
    this.alertctrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PregisterPage');
  }

}
