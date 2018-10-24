import { Component,ViewChild  } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { HellosPage} from '../hellos/hellos';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { LoginssPage } from '../loginss/loginss';

/**
 * Generated class for the BookshopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bookshop',
  templateUrl: 'bookshop.html',
})
export class BookshopPage {
record:any;
public isLarge:boolean;
@ViewChild(Nav) nav: Nav;

public itemsy : Array<any> = [];
bookPage=BookshopPage;
  constructor(public navCtrl: NavController, public platform: Platform,public events:Events,public menu: MenuController,public http: HttpClient, public navParams: NavParams) {
    //this.record= navParams.data;
   
    
    this.record=navParams.get('emails');
   console.log('Passed params', navParams.data);
   console.log(this.record);
  }

  Logout(){
    this.menu.open();
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
  
  loads() : void
  {
     this.http
     .get('http://10.45.24.44/vamsi/shopretrive.php')
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
  same(hello:any,shopname:any){
    console.log(hello);
    this.navCtrl.push(HellosPage,{mailid:hello,shopnames:shopname,pmailid:this.record});
  }
  ionViewDidLoad() {
    this.loads();
    this.Logout();
    console.log('ionViewDidLoad BookshopPage');
  }
 

}
