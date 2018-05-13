import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PregisterPage } from '../pregister/pregister'; 
import { MapsPage} from '../maps/maps';
import { FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private baseURI : string  = "http://localhost/vamsi/Auth.php";
  public plogin:FormGroup;
  constructor(public navCtrl: NavController, public http: HttpClient,public formBuilder:FormBuilder, public navParams: NavParams) {
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
createEntry(mailid:string,pass:string){
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= { "key" : "create", "ID" : mailid, "pass" : pass},
  url       : any      	= this.baseURI ;

this.http.post(url, JSON.stringify(options), headers)
.subscribe((data : any) =>
{
 // If the request was successful notify the user

 console.log(`Congratulations the ${name} was successfully added`);
 this.volt();
},
(error : any) =>
{
 console.log(error);
 
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
       
       this.navCtrl.setRoot(MapsPage);
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
