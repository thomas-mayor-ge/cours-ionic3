import { Component, ViewChild } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { MapComponent } from '../../components/map/map';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the AroundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-around',
  templateUrl: 'around.html',
})
export class AroundPage {

  @ViewChild(MapComponent)
  private map: MapComponent;

  private latitude:number;
  private longitude:number;

  private mapInfo: string = '';
  private watch: any = null;
  private counter:number = 0;

  constructor(private geolocation: Geolocation) {
    this.latitude = 46.2043907;
    this.longitude = 6.143157699999961;
    
  }


  ionViewDidEnter() {
    //this.initGeolocation();
    this.initMap();
  }

  initGeolocation() {
    try {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
        this.mapInfo = JSON.stringify(resp);
        this.initMap();
      }).catch((error) => {
        this.mapInfo = this.counter + ' ' + JSON.stringify(error);
        console.log('Error getting location', error);
      });
      this.watch = this.geolocation.watchPosition();
      this.watch.subscribe((data) => {
        this.counter++;
        this.mapInfo = this.counter + ' ' + JSON.stringify(data);
      });
      this.initMap();
    }
    catch(e) {
      this.mapInfo = JSON.stringify(e);
    }
  }

  initMap() {
    this.map.init(this.latitude, this.longitude, 15);
  }

}
