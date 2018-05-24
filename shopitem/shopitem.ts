import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {HttpHeaders,HttpClient} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the ShopitemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopitem',
  templateUrl: 'shopitem.html',
})
export class ShopitemPage {
  private baseURI:string="http://localhost/vamsi/shopitem.php";
  private baseURIp:string="http://localhost/vamsi/shops.php";
  public items:Array<any>=[];
  public itemsa:Array<any>=[];
  latitude:any;
  longitude:any;
  location:any;
records:any;
  constructor(public navCtrl: NavController,private geolocation: Geolocation,public platform:Platform, public navParams: NavParams, public http: HttpClient) {
    this.records=navParams.get('emails')
    console.log(this.records)
  }
  hello(){
    
  }

  createEntry(name: string) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= { "key" : "create", "NAME" : name },
         url       : any      	= this.baseURI ;

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data : any) =>
     {
        
        console.log(data);
        this.items=data;
        console.log(`Congratulations the ${name} was successfully added`);
     },
     (error : any) =>
     {
        console.log('Something went wrong!');
     });
  }
  
  mapUser(){
    this.platform.ready().then(()=>{
      let options={timeout:3000,enableHighAccuracy:true,maximumAge:0}
  this.geolocation.getCurrentPosition(options).then((location) => {
    console.log('Fetched the location successfully',location);
    this.location=location;
    this.latitude=location.coords.latitude;
    this.longitude=location.coords.longitude;
   
      this.saveEntry();
  }).catch((error) => {
    console.log('Error getting location', error);
  });
  });
    }
    saveEntry() : void
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
          console.log(data);
          this.itemsa = data;
          console.log(`Congratulations the ${latitude} was successfully added`);
          
       },
       (error : any) =>
       {
          console.log({error});
          
       });
    }

  ionViewDidLoad() {
    console.log(this.records);
    let name:string=this.records;
    console.log(name);
    
      this.createEntry(name);  
 
    
    this.mapUser();
    console.log('ionViewDidLoad ShopitemPage');
  }



}
