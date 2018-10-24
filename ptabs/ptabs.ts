import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,AlertController,MenuController, Nav,Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
//import { variable } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GoogleMap,GoogleMaps} from '@ionic-native/google-maps';
import { LoginssPage } from '../loginss/loginss';
import { PloginPage } from '../plogin/plogin';
/**
 * Generated class for the PtabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ptabs',
  templateUrl: 'ptabs.html',
})
export class PtabsPage {
  location:any;
  public locatio:any;
  disabled:boolean;
  position:any;
  map: GoogleMap;
  private baseURI : string  = "http://10.45.24.44/vamsi/shops.php";
  latitude:any;
  longitude:any;
  public itemsy : Array<any> = [];
  record:any;
  
  
 paramData:any;
  @ViewChild(Nav) nav: Nav;

  constructor(public navCtrl: NavController,public events:Events,public menu: MenuController,public http: HttpClient,private alertCtrl: AlertController, public googleMaps:GoogleMaps,public navParams: NavParams,private geolocation: Geolocation,public platform:Platform) {
    this.locatio=[{
       title:'V'
    }];
    
    //var disabled = false;
    this.record=navParams.get('emails')
    events.publish("shareObject", this.record);
    this.paramData=this.record;
    console.log(this.record)
  }
  
  
  
 options={
  color: '#ASDF96',
  fontFamily: '',
  fontSize: '14px',
  fontWeight: 'bold',
   text:'S',
 }
 options1={
  color: '#228B22',
  fontFamily: '',
  fontSize: '14px',
  fontWeight: 'bold',
   text:'P',
 }
  
 
  

saveEntr(){
  this.navCtrl.push(LoginssPage,{emails:this.record});
}

Logouts(){
  this.menu.open();
}

openPage(page) {
  // close the menu when clicking a link from the menu
  this.menu.close();
  // navigate to the new page if it is not the current page
  this.nav.setRoot(page.component);
}
  mapUser(){
  this.platform.ready().then(()=>{
    let options={timeout:3000,enableHighAccuracy:true,maximumAge:0}
this.geolocation.getCurrentPosition(options).then((location) => {
  console.log('Fetched the location successfully',location);
  this.location=location;
  this.latitude=location.coords.latitude;
  this.longitude=location.coords.longitude;
    this.disabled=true;
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
        // If the request was successful notify the user
        console.log(data);
        this.itemsy = data;
        console.log(`Congratulations the ${latitude} was successfully added`);
        console.log(`Congratulations the ${longitude} was successfully added`);
        
     },
     (error : any) =>
     {
        console.log({error});
        this.loads();
     });
  }
  loads() : void
  {
     this.http
     .get('http://10.45.24.44/vamsi/rshop.php')
     .subscribe((data : any) =>
     {
        console.dir(data);
       
        this.itemsy = data;
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }
Logout(){
  let alert = this.alertCtrl.create({
    title: 'CONFIRM LOGOUT',
    message: 'Do you want to Logout',
    buttons: [
      {
        text: 'stay',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
          this.navCtrl.setRoot(PtabsPage);
        }
      },
      {
        text: 'Logout',
        handler: () => {
          console.log('Buy clicked');
          this.navCtrl.setRoot(PloginPage);
        }
      }
    ]
  });
  alert.present();
  
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapsPage');
   // console.log(this.record);
   this.Logouts();
    this.mapUser();  
  }

}
