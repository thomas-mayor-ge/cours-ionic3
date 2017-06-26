import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AroundPage } from './around';

@NgModule({
  declarations: [
    AroundPage,
  ],
  imports: [
    IonicPageModule.forChild(AroundPage),
  ],
  exports: [
    AroundPage
  ]
})
export class AroundPageModule {}
