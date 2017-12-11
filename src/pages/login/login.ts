import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0 || password.value.length == 0) {
        alert("請輸入帳號或密碼");
    } else {
        /*let userinfo: string = '用戶名：' + username.value + '密碼：' + password.value;
        alert(userinfo);
		this.navCtrl.push(TabsPage);*/
		
		$http({
		  method : 'post',
		  url : '/isLogin',
		  data :{
			  user : username.value,
			  password : password.value
		  }
		}).then(function successCallback(response){
		  this.navCtrl.push(TabsPage);
		},function errorCallback(response){
		  alert("帳號密碼其中一個有錯 想知道哪一個嗎??");
		});
    }
  }
    
}
