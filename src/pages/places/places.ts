import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from "rxjs";


import { Place } from "../../models/place";
import { PlaceProvider } from '../../providers/place/place';

/**
 * Generated class for the PlacesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  places$ : Observable<Place[]>;

  constructor(public navCtrl: NavController, private placeProvider: PlaceProvider) {
    this.places$ = this.placeProvider.places$;
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    this.placeProvider.loadAll();

  }

}
