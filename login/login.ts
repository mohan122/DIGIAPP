import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {User} from '../../models/user';
import {AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterPage } from '../register/register';
import { TabhPage } from '../tabh/tabh';
import {  FormControl,Validators,FormBuilder,FormGroup,ValidatorFn,AbstractControl} from '@angular/forms';
import { EmailAuthProvider_Instance } from '@firebase/auth-types';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public items : Array<any> = [];
  user={} as User;
  logins:FormGroup;
  public email:any;
  private baseURI : string  = "http://localhost/vamsi/test.php";
  
  constructor(public navCtrl: NavController,private formBuilder:FormBuilder, public navParams: NavParams, public http: HttpClient,private fire:AngularFireAuth,private alertctrl:AlertController) {
    
    this.logins=this.formBuilder.group({   
      emails: new FormControl('', [Validators.required,Validators.email]),
      passwords: new FormControl('', [Validators.required]),
     // passwords:[''],
    });
  }

  number_check(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
    var re = new RegExp("/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/");
    let input = control.value;
    let isValid=re.test(input);
    if(!isValid) 
    return { 'number_check': {isValid} }
    else 
    return null;
    };
    }
    


  alert(message:string){
    this.alertctrl.create({
      title: 'Alert',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }
   login(user:User):void{
    this.fire.auth.signInWithEmailAndPassword(this.user.email,this.user.password)
    .then(data =>{
  this.navCtrl.setRoot(TabhPage,{emails:this.user.email});
    console.log(this.user.email);
   let EMAILS          : string =this.logins.controls["emails"].value,
     PASSWORD: string=this.logins.controls["passwords"].value
    this.createEntry(EMAILS);
  
  })
  
    .catch(error=>{
      this.navCtrl.setRoot(LoginPage);
      this.alert('Username and Password not match');
    })
  }
 


  createEntry(EMAILS : string) : void
  {
     let headers 	: any		= new HttpHeaders({ 'Content-Type': 'application/json' }),
         options 	: any		= {"key":"create","EMAILS" :EMAILS},
         url       : any      	= this.baseURI ;
         console.log(EMAILS);

     this.http.post(url, JSON.stringify(options), headers)
     .subscribe((data :any) =>
     {
        // If the request was successful notify the user
     
        console.log(`Congratulations the ${EMAILS} was successfully passed`);
     },
     (error : any) =>
     {
        console.log('Something went wrong!');
     });
     
    

    





  }
   



 
 
  Register() {
     this.navCtrl.push(RegisterPage);
}

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SplashPage');
  }
  


 

}
