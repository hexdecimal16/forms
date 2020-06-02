import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './layout/top-nav/top-nav.component';
import { SideNavTogglerComponent } from './layout/side-nav-toggler/side-nav-toggler.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { MyProfileComponent } from './layout/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavTogglerComponent,
    SideNavComponent,
    MyProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
