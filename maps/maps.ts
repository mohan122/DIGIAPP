import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Platform,AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import { variable } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GoogleMap,GoogleMaps,LatLng,CameraPosition,GoogleMapsEvent} from '@ionic-native/google-maps';
import { LoginssPage } from '../loginss/loginss';
import { PloginPage } from '../plogin/plogin';

/*import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';*/

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  location:any;
  public locatio:any;
  disabled:boolean;
  position:any;
  map: GoogleMap;
  private baseURI : string  = "http://192.168.0.8/vamsi/shops.php";
  latitude:any;
  longitude:any;
  public itemsy : Array<any> = [];
  record:any;
  
  
 // map: GoogleMap;
  

  constructor(public navCtrl: NavController,public http: HttpClient,private alertCtrl: AlertController, public googleMaps:GoogleMaps,public navParams: NavParams,private geolocation: Geolocation,public platform:Platform) {
    this.locatio=[{
       title:'V'
    }];
    var disabled = false;
    this.record=navParams.get('emails')
    console.log(this.record)
  }
  /*
  ngAfterViewInit(){
    this.platform.ready().then(() => {
    this.loadMap();
    });
  }
  loadMap(){
    //let element = document.getElementById('map');
    this.map = GoogleMaps.create('map_canvas');
    //let map:GoogleMap=this.googleMaps.create(element,{});
    let latlng=new LatLng(40.7128,74.0059);

    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      let position:CameraPosition<LatLng>={
        target:latlng,
        zoom:10,
        tilt:30
      }
      this.map.moveCamera(position);
    })

  }*/
  
 options={
  color: '#ASDF96',
  fontFamily: '',
  fontSize: '14px',
  fontWeight: 'bold',
   text:'S',
 }

  
  /*loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat:  43.0741904,
          lng:   -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat:  43.0741904,
              lng:  -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }*/
  

saveEntr(){
  this.navCtrl.push(LoginssPage,{emails:this.record});
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
     .get('http://192.168.0.8/vamsi/rshop.php')
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
          this.navCtrl.setRoot(MapsPage);
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
    console.log(this.record);
    //this.loadMap();
    this.mapUser();  
  }

}
