import { Component, Input } from '@angular/core';

/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {

  @Input() mapID: string;
  private map: google.maps.Map;

  constructor() {
    this.mapID = '';
  }

  public init(lat:number, long:number, zoom:number=12) {
    this.map = new google.maps.Map(document.getElementById(`map_canvas_${this.mapID}`),
                                   {
                                     center: new google.maps.LatLng(lat, long),
                                     zoom: zoom,
                                     mapTypeId: google.maps.MapTypeId.ROADMAP
                                    });
  }

}
