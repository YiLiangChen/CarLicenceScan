import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
	this.navCtrl.push(TabsPage);
	/*let myData : string = JSON.stringify({username : username.value,password : password.value});
    if (username.value.length == 0 || password.value.length == 0) {
        alert("請輸入帳號或密碼");
    } else {
		this.loginCheck(myData);
    }*/
  }
  loginCheck(myData : string){
	this.http.post('./login',myData)
		.subscribe(data => {
		    console.log(data/*.data*/);
			this.navCtrl.push(TabsPage);
		},error => {
		    console.log(error.status);
			if(error.status === 404){
				alert("我們維修中喔 請稍後再來!");
			}else{
				alert(error.status);
			}
		});
  }
    
}
