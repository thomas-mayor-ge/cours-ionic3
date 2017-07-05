import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AroundPage } from './around';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';
import { MapComponentModule } from '../../components/map/map.module';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    AroundPage,
  ],
  imports: [
    IonicPageModule.forChild(AroundPage),
    HeaderContentComponentModule,
    MapComponentModule
  ],
  exports: [
    AroundPage
  ],
  providers : [
    Geolocation
  ]
})
export class AroundPageModule {}
