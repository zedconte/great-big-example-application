import { Component, ViewEncapsulation } from '@angular/core'

// import { AppStore } from './app.store'
@Component({
  selector: 'manf-app',
  templateUrl: 'app.page.html',
  styleUrls: ['./app.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppPage {
  // constructor(public appStore: AppStore) {
  public _isDev: boolean = ENV === 'development' ? true : false
  constructor() {
    console.log('welcome to MANF')
  }
}
