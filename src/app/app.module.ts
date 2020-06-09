import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavComponent } from './layout/profile/top-nav/top-nav.component';
import { SideNavTogglerComponent } from './layout/profile/side-nav-toggler/side-nav-toggler.component';
import { SideNavComponent } from './layout/profile/side-nav/side-nav.component';
import { MyProfileComponent } from './layout/profile/my-profile/my-profile.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import {Routes, RouterModule} from '@angular/router';
import { FeedbackformComponent } from './layout/profile/feedbackform/feedbackform.component';
import { AdminLoginComponent } from './layout/admin-login/admin-login.component'
import { AdminRegisterComponent } from './layout/admin-register/admin-register.component'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'adminRegister', component: AdminRegisterComponent},
  {path: 'adminLogin', component: AdminLoginComponent}
];

const config = {
  apiKey: "AIzaSyApi4z6ojPST8yyDwvRD_Ac8fPN7Gl1RTk",
  authDomain: "hbtu-forms.firebaseapp.com",
  databaseURL: "https://hbtu-forms.firebaseio.com",
  projectId: "hbtu-forms",
  storageBucket: "hbtu-forms.appspot.com",
  messagingSenderId: "962906554591",
  appId: "1:962906554591:web:c6bc376313a2684dd4e96a",
  measurementId: "G-X7P4N93H3S"
};

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideNavTogglerComponent,
    SideNavComponent,
    MyProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    FeedbackformComponent,
    AdminLoginComponent,
    AdminRegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
