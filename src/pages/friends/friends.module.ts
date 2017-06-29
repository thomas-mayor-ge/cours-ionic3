import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendsPage } from './friends';
import { HeaderContentComponentModule } from '../../components/header-content/header-content.module';
import { Contacts } from '@ionic-native/contacts';

@NgModule({
  declarations: [
    FriendsPage,
  ],
  imports: [
    IonicPageModule.forChild(FriendsPage),
    HeaderContentComponentModule,
  ],
  exports: [
    FriendsPage
  ],
  providers: [
    Contacts
  ]
})
export class FriendsPageModule {}
