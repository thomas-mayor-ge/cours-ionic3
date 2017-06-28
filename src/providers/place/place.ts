import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from "rxjs";

import { EndpointsProvider } from '../endpoints';
import { Place } from '../../models/place';
/*
  Generated class for the PlaceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PlaceProvider {

  private places = new BehaviorSubject([]);
  public places$: Observable<Place[]> = this.places.asObservable();
  private error: string;
  constructor(public authHttp: AuthHttp,
              private readonly endpoints: EndpointsProvider) {
    console.log('Hello PlaceProvider Provider');
  }

  loadAll() : Observable<any> {
    console.log('loadAll');
    return this.authHttp.get(this.endpoints.getPlaces())
                    .map(res => res.text())
                    .map(places => { console.log('got places'); return this.places.next(JSON.parse(places)) } )                    
                    .catch(err => Observable.throw(this.handleErrors(err)));
  }

  private handleErrors(err: any): any {
    if (!err.ok && err.statusText == '') {
      err.statusText = 'Erreur de connexion avec le serveur';
    }
    return err;
  }

}
