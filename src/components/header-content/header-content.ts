import { Component, Input, EventEmitter, Output } from '@angular/core';

/**
 * Generated class for the HeaderContentComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'header-content',
  templateUrl: 'header-content.html'
})
export class HeaderContentComponent {

  @Input() title: string;
  @Input() backEnabled: boolean;
  showBack: boolean;

  @Output() onBack: EventEmitter<any> = new EventEmitter();


  text: string;

  constructor() {
    console.log('Hello HeaderContentComponent Component');
    this.text = 'Hello World';
  }

  ngOnInit() {
    this.showBack = this.backEnabled;
  }

  onClickBack() {
    this.onBack.emit({});
  }

}
