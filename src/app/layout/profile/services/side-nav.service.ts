import { Injectable } from '@angular/core';
 
@Injectable({
  providedIn: 'root'
})
export class AuthorisedSideNavService {
  hideSideNav: boolean = false;
  profile: boolean = false;
  feedbackForm  = true;
 
 
  constructor() { }
 
  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }

  toggleList(): void {
    this.profile = !this.profile;
    this.feedbackForm = !this.feedbackForm;
  }
}