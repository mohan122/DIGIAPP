import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController ,Platform} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { FormBuilder,FormGroup} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';




/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  registeritems:FormGroup;
  public isKgsSelected: boolean;
  public isbuttonselecteda:boolean;
  public isbuttonselectedb:boolean;
  public isbuttonselectedc:boolean;
  public isbuttonselectedd:boolean;
  public isbuttonselectede:boolean;
  
public isPiecesSelected: boolean;
private baseURIp : string  = "http://localhost/vamsi/reglocate.php";
private baseURI : string  = "http://localhost/vamsi/itemretrive.php";
private baseURIs : string  = "http://localhost/vamsi/updateitemk.php";
id:number;
recor:any;
location:any;
latitude:any;
longitude:any;

 /* public listItems: any;*/

  
  

  constructor(public navCtrl: NavController,private geolocation: Geolocation,public platform:Platform,private formBuilder:FormBuilder, public http: HttpClient,public navParams: NavParams,private fire:AngularFireAuth,private toast:ToastController) {

    this.isbuttonselecteda=false;
    this.isbuttonselectedb=false;
    this.isbuttonselectedc=false;
    this.isbuttonselectedd=false;
    this.isbuttonselectede=false;
    
    console.log('Passed params', navParams.data);
    /*this.listItems=[{
    
    }];*/
  
  this.registeritems=this.formBuilder.group({
       nameofitem:[''],
       aq:[''],
       price:[''],
       Weighta:[''],
       piecesa:[''],
       costa:[''],
       Weightb:[''],
       piecesb:[''],
       costb:[''],
       Weightc:[''],
       piecesc:[''],
       costc:[''],
       Weightd:[''],
       piecesd:[''],
       costd:[''],
       Weighte:[''],
       piecese:[''],
       coste:[''],
       Weightf:[''],
       piecesf:[''],
       costf:[''],
       emailf:[navParams.data],
       

  });
  }
  submit(){
   
    this.registeritems.reset();
  }
  mapUse(){
    this.platform.ready().then(()=>{
      let options={timeout:3000,enableHighAccuracy:true,maximumAge:0}
  this.geolocation.getCurrentPosition(options).then((location) => {
    console.log('Fetched the location successfully',location);
    this.location=location;
    this.latitude=location.coords.latitude;
    this.longitude=location.coords.longitude;
      this.saveEntr();
  }).catch((error) => {
    console.log('Error getting location', error);
  });
  });
    }
  saveEntr() : void
  {
     let latitude:number=this.latitude,
        longitude:number=this.longitude;

    
        this.createEntr(latitude,longitude);
  }
  createEntr(latitude:number,longitude:number) : void
{
   let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
       options 	: any		= {"key":"create", "latitude":latitude,"longitude":longitude },
       url       : any      	= this.baseURIp ;

   this.http.post(url, JSON.stringify(options), headers)
   .subscribe((data : any) =>
   {
      // If the request was successful notify the user
   
      console.log(`Congratulations the ${latitude} was successfully added`);
      this.saveEntry();
   },
   (error : any) =>
   {
      console.log({error});
   });
}



  createEntry(EMAIL : string,weighta:number,piecesa:number,costa:number,weightb:number,piecesb:number,costb:number,weightc:number,piecesc:number,costc:number,weightd:number,piecesd:number,costd:number,weighte:number,piecese:number,coste:number,weightf:number,piecesf:number,costf:number,emailf:string) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= { "key" : "create", "EMAIL" : EMAIL, "weighta" : weighta,"piecesa":piecesa,"costa":costa, "weightb" : weightb,"piecesb":piecesb,"costb":costb, "weightc" : weightc,"piecesc":piecesc,"costc":costc, "weightd" : weightd,"piecesd":piecesd,"costd":costd, "weighte" : weighte,"piecese":piecese,"coste":coste, "weightf" : weightf,"piecesf":piecesf,"costf":costf,"emailf":emailf },
         url       : any      	= this.baseURI ;

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data : any) =>
     {
        // If the request was successful notify the user
     
        console.log(`Congratulations the ${EMAIL} was successfully added`);
        this.registeritems.reset();
     },
     (error : any) =>
     {
        console.log({error});
     });
  }


  registerEntry(name : string,weight:number,price:number,emailf:string) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= { "key" : "create", "name" : name, "weight" : weight,"price":price,"emailf":emailf },
         url       : any      	= this.baseURIs ;

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data : any) =>
     {
        // If the request was successful notify the user
     
        console.log(`Congratulations the ${name} was successfully added`);
        this.registeritems.reset();
     },
     (error : any) =>
     {
        console.log('Something went wrong!');
     });
  }


  saveEntry() : void
  {
    if(this.isPiecesSelected){
     let EMAIL          : string = this.registeritems.controls["nameofitem"].value,
         weighta   : number   = this.registeritems.controls["Weighta"].value,
         piecesa         : number = this.registeritems.controls["piecesa"].value,
         costa:number=this.registeritems.controls["costa"].value,
         weightb   : number   = this.registeritems.controls["Weightb"].value,
         piecesb         : number = this.registeritems.controls["piecesb"].value,
         costb:number=this.registeritems.controls["costb"].value,
         weightc   : number   = this.registeritems.controls["Weightc"].value,
         piecesc         : number = this.registeritems.controls["piecesc"].value,
         costc:number=this.registeritems.controls["costc"].value,
         weightd   : number   = this.registeritems.controls["Weightd"].value,
         piecesd         : number = this.registeritems.controls["piecesd"].value,
         costd:number=this.registeritems.controls["costd"].value,
         weighte   : number   = this.registeritems.controls["Weighte"].value,
         piecese         : number = this.registeritems.controls["piecese"].value,
         coste:number=this.registeritems.controls["coste"].value,
         weightf   : number   = this.registeritems.controls["Weightf"].value,
         piecesf         : number = this.registeritems.controls["piecesf"].value,
         costf:number=this.registeritems.controls["costf"].value,
         emailf:string=this.navParams.data

    
        this.createEntry(EMAIL,weighta,piecesa,costa,weightb,piecesb,costb,weightc,piecesc,costc,weightd,piecesd,costd,weighte,piecese,coste,weightf,piecesf,costf,emailf);
    }
    else if( this.isKgsSelected){
      let name          : string = this.registeritems.controls["nameofitem"].value,
      weight  : number   = this.registeritems.controls["aq"].value,
      price  : number   = this.registeritems.controls["price"].value,
      emailf:string=this.navParams.data  
          
      this.registerEntry(name,weight,price,emailf);

    }
  }
 /*public additem():void{
     this.listItems.push({
       name: "vamsi",
       value: 1
     });
 }*/
 
 
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
 
 openss(){
   this.isbuttonselecteda=true;
   this.isbuttonselectedb=false;
    this.isbuttonselectedc=false;
    this.isbuttonselectedd=false;
    this.isbuttonselectede=false;
    
 }
 opensb(){
  this.isbuttonselecteda=true;
  this.isbuttonselectedb=true;
   this.isbuttonselectedc=false;
   this.isbuttonselectedd=false;
   this.isbuttonselectede=false;
   
}
opensc(){
  this.isbuttonselecteda=true;
  this.isbuttonselectedb=true;
   this.isbuttonselectedc=true;
   this.isbuttonselectedd=false;
   this.isbuttonselectede=false;
}
opensd(){
  this.isbuttonselecteda=true;
  this.isbuttonselectedb=true;
   this.isbuttonselectedc=true;
   this.isbuttonselectedd=true;
   this.isbuttonselectede=false;
}
opense(){
  this.isbuttonselecteda=true;
  this.isbuttonselectedb=true;
   this.isbuttonselectedc=true;
   this.isbuttonselectedd=true;
   this.isbuttonselectede=true;
}
 cancel()
 {
     this.isKgsSelected = false;
     this.isPiecesSelected = false;
 }
  Logout(){
    this.navCtrl.setRoot(LoginPage);
  }
  

  ionViewWillLoad() {
   
    this.isKgsSelected = false;
    this.isPiecesSelected = false;
    this.fire.authState.subscribe(user=>{
      if(user && user.email && user.uid){
      this.toast.create({
         message:'Successfully logged into Digimart',
         duration:3000
      }).present();
    }
    else{
      this.toast.create({
        message:'User name or Password not matched',
        duration:3000
     }).present();
  }
  })

}
}
