import { isPlatformBrowser } from '@angular/common';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  private $isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedObservable = this.$isLoggedIn.asObservable();


  updateLogin(loggedIn: boolean) {
    this.$isLoggedIn.next(loggedIn)
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('Admin', loggedIn.toString())
    }

  }

  returnLoginValue() {
    return this.loggedObservable;
  }

}
