import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos : any;
  public base64Image: string;
  constructor(public navCtrl: NavController,private camera: Camera,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {

  }
  
  ngOnInit(){
	  this.photos = [];
  }
  
  deletPhoto(index){
		
		let confirm = this.alertCtrl.create({
		title: '查看此相片',
		message: 'Do you want to deletPhoto?',
		buttons: [
			{
				text: '違停紀錄',
				handler: () => {
					
				}
			},
			{
			text: '刪掉',
			handler: () => {
				this.photos.splice(index,1);
			  }
			}
		  ]
		});
		confirm.present();
  }
  
  takePhoto(){
	    alert('喵~把人家照得好看一點!');
		const options: CameraOptions = {
		    quality: 50,
		    destinationType: this.camera.DestinationType.DATA_URL,
		    encodingType: this.camera.EncodingType.JPEG,
		    mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64:
		    this.base64Image = 'data:image/jpeg;base64,' + imageData;
			//將拍好的相片放入陣列
			this.photos.push(this.base64Image);
			//反轉方便排序
			this.photos.reverse();
		}, (err) => {
		 // Handle error
		});
  }
  
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}
