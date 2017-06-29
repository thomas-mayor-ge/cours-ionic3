import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Contacts, Contact, /*ContactField, ContactFieldType, ContactName,*/ IContactFindOptions } from '@ionic-native/contacts';

/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  private contacts: Contact[] = [];
  private error: string = '';
  constructor(public navCtrl: NavController, private contactProvider: Contacts, private platform: Platform) {
  }

  ionViewDidEnter() {
    this.loadContacts();
  }

  async loadContacts() {
    await this.platform.ready();

      try {

        let opts: IContactFindOptions = {
          filter: '',
          multiple: true,
          hasPhoneNumber: true
        };
        this.contactProvider.find([], opts).then(
          (contacts) => { this.contacts = contacts; console.log(contacts); this.error = JSON.stringify(contacts) },
          (error) => this.error = error
        );
      }
      catch (e) {
        console.log('Contact Exception', e);
        this.error = e;
      }

  }

}
