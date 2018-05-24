import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform,AlertController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { ShopitemPage } from '../shopitem/shopitem';

/**
 * Generated class for the LoginssPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loginss',
  templateUrl: 'loginss.html',
})
export class LoginssPage {
  public itemsy : Array<any> = [];
  public itemsk: Array<any> = [];
  location:any;
  position:any;
  value:any;
  lappy:any;
  latitude:any;
  dats:any;
  records:any;
  vamsi:any;
  
  public ionicNamedColor: string = 'primary';
  longitude:any;
  private baseURI : string  = "http://localhost/vamsi/tesa.php";
  private baseURIp : string  = "http://localhost/vamsi/productdis.php";
  constructor(public navCtrl: NavController,private alertctrl:AlertController,private geolocation: Geolocation,public platform:Platform, public navParams: NavParams,public http   : HttpClient) {
    this.records=navParams.get('emails')
    console.log(this.records)
    
  }

  initializeItems() {
    this.itemsk = this.itemsy;
    
  }
  alert(message:string){
    this.alertctrl.create({
      title: 'Location Alert',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
  

  mapUse(){
    this.platform.ready().then(()=>{
      let options={timeout:3000,enableHighAccuracy:true,maximumAge:0}
  this.geolocation.getCurrentPosition(options).then((location) => {
    console.log('Fetched the location successfully',location);
    this.location=location;
    this.latitude=location.coords.latitude;
    this.longitude=location.coords.longitude;
    console.log(location.coords.latitude);
      this.saveEntry();
  }).catch((error) => {
    console.log('Error getting location', error);
  
    this.alert('No Location Traced');
  });
  });
    }
    getItems(ev: any) {
      // Reset items back itemsto all of the 
      
      this.initializeItems();
      // set val to the value of the searchbar
      let val = ev.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.itemsk = this.itemsk.filter((itemy) => {
          return (itemy.item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  
  
    saveEntry() : void
    {
       let latitude:number=this.latitude,
          longitude:number=this.longitude;
  
      
          this.createEntry(latitude,longitude);
    }
    createEntry(latitude:number,longitude:number) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= {"key":"create", "latitude":latitude,"longitude":longitude },
         url       : any      	= this.baseURI ;

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data : any) =>
     {
       
        console.log(data);
        this.itemsy = data;
        this.initializeItems();
        console.log(`Congratulations the ${latitude} was successfully added`);
      
     },
     (error : any) =>
     {
        console.log({error});
     });
  }


 
  
  hello(itemy,i){
    this.ionicNamedColor = 'secondary';
    
    let index = this.itemsk.indexOf(itemy);
    if(index > -1){
      this.dats=this.itemsk[index];
      let dat:string=this.dats.item;
      console.log(dat);
      let latitudes:number=this.latitude,
      longitudes:number=this.longitude;
      let name:string=this.records;
      console.log(latitudes);
      this.registeritem(dat,latitudes,longitudes,name);
    }
    
    }
    registeritem(dat:string,latitudes:number,longitudes:number,name:string) : void
    {
       console.log(dat);
       console.log(latitudes);
       console.log(longitudes);
       let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
           options 	: any		= {"key":"create", "piece":dat,"latitude":latitudes,"longitude":longitudes,"mail":name},
           url       : any      	= this.baseURIp ;
  
       this.http.post(url, JSON.stringify(options), headers)
       .subscribe((data : any) =>
       {
          // If the request was successful notify the user
       
          console.log(`Congratulations the ${dat} was successfully added`);
          
         
       },
       (error : any) =>
       {
          console.log({error});
       });
    }
  ionViewDidLoad() {
    this.mapUse();
    
    console.log('ionViewDidLoad LoginssPage');
    console.log(this.records);
  }
  mohan(){
    console.log(this.records);
    this.navCtrl.push(ShopitemPage,{emails:this.records});
  }

}
