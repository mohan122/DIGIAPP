import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { YourItemsPage } from '../your-items/your-items';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the FinalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final',
  templateUrl: 'final.html',
})
export class FinalPage {
  pmaii:any;
  public itemsy : Array<any> = [];
  private baseURI : string  = "http://10.45.24.44/vamsi/Final.php";
  private baseURIs : string  = "http://10.45.24.44/vamsi/confirmorder.php";
  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
    this.pmaii=navParams.get('Item')
  }
  bill(){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {"key":"create", "mail":this.pmaii },
    url       : any      	= this.baseURI ;

this.http.post(url, JSON.stringify(options), headers)
.subscribe((data : any) =>
{
   // If the request was successful notify the user

   console.log(data);
   this.itemsy = data;
 
},
(error : any) =>
{
   console.log({error});
});
  }
  ionViewDidLoad() {
     this.bill();
    console.log('ionViewDidLoad FinalPage');
  }
  hello(){
    let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
    options 	: any		= {"key":"create", "mail":this.pmaii },
    url       : any      	= this.baseURIs ;

this.http.post(url, JSON.stringify(options), headers)
.subscribe((data : any) =>
{
   // If the request was successful notify the user

   console.log(data);
   this.itemsy = data;
 
},
(error : any) =>
{
   console.log({error});
});
  }

}
