import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AlertController} from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FinalPage } from '../final/final';
/**
 * Generated class for the ItembuyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-itembuy',
  templateUrl: 'itembuy.html',
})
export class ItembuyPage {
records:any;
recc:any;
summ:number;
value:number;
maii:any;
pmaii:any;
public itemsa:Array<any>=[];
public isbuttonSelected: boolean;
private baseURI : string  = "http://10.45.24.44/vamsi/Byshop.php";
private baseURIa:string="http://10.45.24.44/vamsi/Billings.php";
private baseURIb:string="http://10.45.24.44/vamsi/delproductbuying.php";
  constructor(public navCtrl: NavController,private toastCtrl: ToastController, public http: HttpClient, public navParams: NavParams) {
    this.summ=0;
    this.records=navParams.get('shoopname');
    this.recc=navParams.get('Item');
    this.maii=navParams.get('mailid')
    this.pmaii=navParams.get('pmailid')
    console.log(this.records);
    console.log(this.recc);
    console.log(this.maii);
    console.log(this.pmaii);
    this.isbuttonSelected=false;


  }
  Map():void {
    //let mailids          : string = this.records;
       this.createEntry(this.maii);
    
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
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'COST:'+' '+ String(this.value),
    position: 'bottom',
    showCloseButton: true,
    closeButtonText: 'OK',
    cssClass: 'success'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
    
  });

  toast.present();
}

caluclatetotal(hero:number){
this.summ=this.summ+hero;
console.log(this.summ);
}
caluclate(You:number,money:number,weights:number){
  console.log(You);
  console.log(money);
  this.value=You*money;
  this.isbuttonSelected=true;
  this.presentToast();
  
  this.caluclatetotal(this.value);
  this.senddatabase(You,money,this.value,weights);
}
navi(){
  this.navCtrl.pop();
}
navis(){
  let headers:any=new HttpHeaders({'Content-Type':'application/json'}),
  options:any={"key" : "create","e":this.pmaii},
  url:any=this.baseURIb ;
  this.http.post(url,JSON.stringify(options),headers)
  .subscribe((data:any)=>{
    console.log(data);
  },(error:any)=>{
    console.log({error});
  });


  this.navCtrl.setRoot(FinalPage,{Item:this.pmaii});
}
senddatabase(a:number,b:number,c:number,k:number){
  let headers:any=new HttpHeaders({'Content-Type':'application/json'}),
  options:any={"key" : "create","d":this.maii,"e":this.pmaii,"f":this.recc,"g":k,"h":a,"i":b,"j":c},
  url:any=this.baseURIa ;
  this.http.post(url,JSON.stringify(options),headers)
  .subscribe((data:any)=>{
    console.log(data);
  },(error:any)=>{
    console.log({error});
  });
}
  ionViewDidLoad() {
    this.Map();
    console.log('ionViewDidLoad ItembuyPage');
  }

}
