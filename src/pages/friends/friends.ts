import { Component } from '@angular/core';
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { Contacts, /*Contact, ContactField, ContactFieldType, ContactName,*/ IContactFindOptions } from '@ionic-native/contacts';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

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
  private info: string = '';

  constructor(public navCtrl: NavController, 
              private contactProvider: Contacts, 
              private platform: Platform,
              private sanitizer: DomSanitizer,
              private storage: Storage) {
    this.storage.set('test', 'test');
    this.storage.get('test').then(val => console.log('test = ' + val));
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
                          this.info = '';//JSON.stringify(this.storage) + ' ';                          
                          this.error = '';
                          /*try {
                            this.storage.set('test', 'test');
                          }
                          catch (e) {
                            this.info += this.formatError(e);
                          }*/

                          try {
                           /* this.storage.set('contacts', contacts).then(_ => this.info += ' storage success')
                                                                  .catch(err => this.info += ' storage error ' + JSON.stringify(err));        */                    

                            let foundContacts = contacts.filter(contact => contact.phoneNumbers && contact.phoneNumbers.length && contact.displayName)
                                                        .map(contact => { 
                                                                          let phoneStr = [];
                                                                          contact.phoneNumbers.forEach(phone => {
                                                                                                                  phoneStr.push(phone.value.split(' ').join('')) 
                                                                                                                });

                                                                          return { 
                                                                                    id: contact.id, 
                                                                                    name : contact.displayName, 
                                                                                    phone: /*contact.phoneNumbers[0].value*/ phoneStr.join(', '),
                                                                                    phones: contact.phoneNumbers.map(phone => phone.value.split(' ').join('')),
                                                                                    photo: contact.photos ? this.sanitizer.bypassSecurityTrustUrl(contact.photos[0].value) : null,
                                                                                  }})
                                                        .sort((contact1, contact2) => contact1.name.localeCompare(contact2.name));
                            //group contact by name's first letter
                            this.error += `${foundContacts.length} contacts found<br>`;
                            
                            let newContacts = [];
                            foundContacts.forEach(contact => { 
                                                                let first = contact.name.substring(0,1).toUpperCase();
                                                                let group = newContacts.find(item => item.group == first);
                                                                if (!group) {
                                                                  group = { group: first, contacts:[]};
                                                                  newContacts.push(group);
                                                                }
                                                                group.contacts.push(contact);
                                                            });
                            this.contacts = newContacts;
                            //group contact by name
                            let groupedContacts = [];
                            foundContacts.forEach(contact => { 
                                                                let group = groupedContacts.find(item => item.group == contact.name);
                                                                if (!group) {
                                                                  group = { group: contact.name, contacts:[]};
                                                                  groupedContacts.push(group);
                                                                }
                                                                group.contacts.push(contact);
                                                            });
                            
                            this.error += `${groupedContacts.length} grouped contacts<br>`;
                            
                            let contactToMerge = 0;

                            let index = 0;
                            let contactsString = ''
                            try {
                            groupedContacts.forEach(group => {
                                                                if (group.contacts.length > 1) {
                                                                  let superContact = null;
                                                                  group.contacts.forEach(contact => {
                                                                    if (superContact == null) {
                                                                      superContact = contact;
                                                                    }
                                                                    else {
                                                                      //compare with super contact
                                                                      let same = 0;
                                                                      contact.phones.forEach(phone => {   
                                                                        if (superContact.phones.findIndex(superPhone => superPhone === phone) <= -1)
                                                                          same++;
                                                                      });
                                                                      if (same == contact.phones.length) {
                                                                        contactToMerge++;
                                                                        contactsString += contact.name + '\n'
                                                                      }
                                                                    }
                                                                  })
                                                                }
                                                                index++;
                                                            });
                                                            
                            }
                            catch (e) {
                              this.error += 'Exception ' + this.formatError(e);
                            }
                            this.error += `${contactToMerge} contacts can be merged`;
                            this.error += '\n' + contactsString;
                            
                          }
                          catch (e) {
                            this.error = this.formatError(e);
                          }

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

  formatError(e): string {
    let ret = '' + e;
    if (e.fileName)
      ret += ' ' + e.fileName;
    if (e.lineNumber)
      ret += ' ' + e.lineNumber; 
    return ret;
  }

}
