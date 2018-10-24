 import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItembuyPage } from '../itembuy/itembuy';

/**
 * Generated class for the HellosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hellos',
  templateUrl: 'hellos.html',
})
export class HellosPage {
iteminfo:any;
recc:any;
public itemsa:Array<any>=[];
private baseURI : string  = "http://10.45.24.44/vamsi/Byshop.php";
records:any;
precords:any;
  constructor(public navCtrl: NavController, public http: HttpClient,public navParams: NavParams) {
    this.iteminfo=this.navParams;
    this.records=navParams.get('mailid');
    this.precords=navParams.get('pmailid');
    this.recc=navParams.get('shopnames')
    console.log(this.records)
    console.log(this.recc)
    console.log(this.precords)
  }


  Map():void {
    let mailids          : string = this.records;
        console.log(mailids);
       this.createEntry(mailids);
    
}
createEntry(emailids:string){
  let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
  options 	: any		= {  "ID" : emailids},
  url       : any      	= this.baseURI ;

this.http.post(url, JSON.stringify(options), headers)
.subscribe((data : any) =>
{
 
  console.log(data);
  
  this.itemsa=data;
  
},(error : any) =>
{
 console.log({error});

});
}

same(items:any){
  this.navCtrl.push(ItembuyPage,{Item:items,shoopname:this.recc,mailid:this.records,pmailid:this.precords});
}
  ionViewDidLoad() {
    this.Map();
    console.log('ionViewDidLoad HellosPage');
  }

}
