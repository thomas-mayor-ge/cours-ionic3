import { Component } from '@angular/core';
import { IonicPage, Platform } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the AddPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public imageSrc: string = 'http://lorempixel.com/500/500';
  public error: string = '';

  constructor(private platform: Platform, private camera : Camera) {


  }

  takePictureClick() {
      this.takePicture();
  }


  async takePicture() {
      await this.platform.ready();

      try {
        let options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          targetHeight: 500,
          targetWidth: 500
        }

        this.camera.getPicture(options).then(
            (imageData) => this.imageSrc = 'data:image/jpeg;base64,' + imageData,
            (err) => this.error = err);
      }
      catch (e) {
        this.imageSrc = '';
        console.log('Camera Exception', e);
        this.error = e;
      }
  }

}
