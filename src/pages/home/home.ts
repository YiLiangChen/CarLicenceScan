import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as $ from 'jquery';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public photos : any;
    public base64Image: string;
    constructor(public navCtrl: NavController,private camera: Camera,public loadingCtrl: LoadingController,public alertCtrl: AlertController) {

    }
	//api
    processImage(id) {
        var subscriptionKey = "c588514aa0c7439a940dd06e81fec312";
        var uriBase = "https://eastasia.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en";
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };
        var sourceImageUrl = id;//document.getElementById("inputImage").value;
        $.ajax({
            url: uriBase + "?" + $.param(params),
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })
        .done(function(data) {
            // Show formatted JSON on webpage.
            $("#responseTextArea").val(JSON.stringify(data, null, 2));
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
            alert(errorString);
        });
    }
	
	testpassing(id){
		var subscriptionKey = "c588514aa0c7439a940dd06e81fec312";
        var uriBase = "https://eastasia.api.cognitive.microsoft.com/vision/v1.0/analyze";
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };
		//var sourceImageUrl = 'http://komica.yucie.net/cat/src/1486142305067.jpg';
		//var xD='#img'+id;
		//var formData = new FormData($(xD)[0]);  
			$.ajax({  
				url: uriBase + "?" + $.param(params),
				beforeSend: function(xhrObj){
					xhrObj.setRequestHeader("Content-Type","application/json");
					xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
				},
				type: 'POST',  
				//data:'{"url": ' + '"' + sourceImageUrl + '"}',
				data:formData,
				/*async: false,  
				cache: false,  
				contentType: false,  
				processData: false */ 
			})
			.done(function(data) {
				// Show formatted JSON on webpage.
				$("#responseTextArea").val(JSON.stringify(data, null, 2));
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
				errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
				alert(errorString);
			});
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
		this.presentLoading();
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
