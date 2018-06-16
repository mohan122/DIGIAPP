
import { IonicPage, NavController, NavParams ,Platform} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component ,ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {  FormControl,Validators,FormBuilder,FormGroup,ValidatorFn,AbstractControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';





/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
   @ViewChild('username') user;
   @ViewChild('password') password;
   location:any;
   public register:FormGroup;
   private baseURI : string  = "http://localhost/vamsi/register.php";
   latitude:any;
   Promise:PromiseConstructor;
   longitude:any;
  constructor(private fire: AngularFireAuth,  private nativeGeocoder  :  NativeGeocoder, public http: HttpClient,public formBuilder:FormBuilder,public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation,public platform:Platform) {
    this.register=this.formBuilder.group({
      name:new FormControl('', [Validators.required,Validators.email]),
      mobile:new FormControl('', [Validators.required,this.number_check()]),
      password:new FormControl('', [Validators.required]),
      retypepassword:new FormControl('', [Validators.required]),
      category:[''],
      nameofshop:new FormControl('', [Validators.required]),
      latitude:[''],
      longitude:[''],
    },{validator: this.matchingPasswords('password', 'retypepassword')});
  }
  matchingPasswords(passwordKey: string, retypepasswordKey: string) {
    
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[retypepasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  number_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    var re = new RegExp("[789][0-9]{9}");
    let input = control.value;
    let isValid=re.test(input);
    if(!isValid) 
    return { 'number_check': {isValid} }
    else 
    return null;
    };
    }
  createEntry(name : string, mobile : number,password:string,retypepassword:string,nameofshop:string,category:string,latitude:number,longitude:number) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= { "key" : "create", "NAME" : name, "MOBILE" : mobile,"PASSWORD":password,"RETYPEPASSWORD":retypepassword,"CATEGORY":category,"SHOPNAME":nameofshop,"latitude":latitude,"longitude":longitude },
         url       : any      	= this.baseURI ;

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data : any) =>
     {
        // If the request was successful notify the user
        console.log(data);
        console.log(`Congratulations the ${name} was successfully added`);
     },
     (error : any) =>
     {
        console.log('Something went wrong!');
     });
  }
  saveEntry() : void
  {
     let name          : string = this.register.controls["name"].value,
         mobile   : number   = this.register.controls["mobile"].value,
         password         : string = this.register.controls["password"].value,
         retypepassword:string=this.register.controls["retypepassword"].value,
         nameofshop         : string = this.register.controls["nameofshop"].value,
         category:string=this.register.controls["category"].value,
        latitude:number=this.register.controls["latitude"].value,
        longitude:number=this.register.controls["longitude"].value;

    
        this.createEntry(name,mobile,password,retypepassword,nameofshop,category,latitude,longitude);
  }

 
  async registerUser() {
    const result=this.fire.auth.createUserWithEmailAndPassword(this.user.value,this.password.value)
    .then(result=> {
     console.log('got data',result);
}
)
 .catch(error=>{
     console.log('got error',error);
});
this.platform.ready().then(()=>{
this.nativeGeocoder.reverseGeocode(this.latitude,this.longitude)
  .then((result: NativeGeocoderReverseResult) => {
    console.log(JSON.stringify(result));
     let str : string   = `The reverseGeocode address is  ${result.countryCode}`;
  })
  .catch((error: any) =>{
    console.log(error);

  });
});

   this.platform.ready().then(()=>{
    let options={timeout:3000,enableHighAccuracy:true,maximumAge:0}
this.geolocation.getCurrentPosition(options).then((location) => {
  console.log('Fetched the location successfully',location);
  this.location=location;
  this.latitude=location.coords.latitude;
  this.longitude=location.coords.longitude;
}).catch((error) => {
  console.log('Error getting location', error);
});
});

}
ionViewDidLoad() {
  console.log('ionViewDidLoad RegisterPage');
}
}
