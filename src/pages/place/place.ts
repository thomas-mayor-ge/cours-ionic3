import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Place } from '../../models/place';
import { MapComponent } from '../../components/map/map';
/**
 * Generated class for the PlacePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  @ViewChild(MapComponent)
  private map: MapComponent;

  private place: Place;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = navParams.get('place');
  }

  ionViewDidEnter() {
    this.map.init(this.place.lat, this.place.long);
  }

  onBackClick() {
    console.log('onBack');
    this.navCtrl.pop();
  }

}
