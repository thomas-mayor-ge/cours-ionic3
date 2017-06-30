import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Contacts, /*Contact, ContactField, ContactFieldType, ContactName,*/ IContactFindOptions } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';

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
  private contacts: Array<any> = [];
  private error: string = '';
  constructor(public navCtrl: NavController, 
              private contactProvider: Contacts, 
              private platform: Platform,
              private sanitizer: DomSanitizer,) {
  }

  ionViewDidEnter() {
    this.loadContacts();
    /*this.contacts = [
      { group: 'A', contacts: [ {name : 'toto', id: 1},{name : 'titi', id: 2},{name : 'tata', id: 3} ]},
      { group: 'B', contacts: [ {name : 'toto', id: 1},{name : 'titi', id: 2},{name : 'tata', id: 3} ]},
      { group: 'C', contacts: [ {name : 'toto', id: 1},{name : 'titi', id: 2},{name : 'tata', id: 3} ]},
    ];*/
  }

  async loadContacts() {
    await this.platform.ready();

      try {

        let opts: IContactFindOptions = {
          filter: '',
          multiple: true,
          hasPhoneNumber: true
        };
        this.contactProvider.find(['*'], opts).then(
          (contacts) => { 
                          let foundContacts = contacts.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length && contact.displayName)
                                                      .map(contact => { return { 
                                                                                  id: contact.id, 
                                                                                  name : contact.displayName, 
                                                                                  phone: contact.phoneNumbers[0].value,
                                                                                  photo: contact.photos ? this.sanitizer.bypassSecurityTrustUrl(contact.photos[0].value) : null
                                                                                }})
                                                      .sort((contact1, contact2) => contact1.name.localeCompare(contact2.name));
                          this.contacts = [];
                          foundContacts.forEach(contact => { 
                                                              let first = contact.name.substring(0,1).toUpperCase();
                                                              let group = this.contacts.find(item => item.group == first);
                                                              if (!group) {
                                                                group = { group: first, contacts:[]};
                                                                this.contacts.push(group);
                                                              }
                                                              group.contacts.push(contact);
                                                           });
                          //this.error = JSON.stringify();
                        },
          (error) => this.error = error
        );
      }
      catch (e) {
        console.log('Contact Exception', e);
        this.error = e;
      }

  }

}
