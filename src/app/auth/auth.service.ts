import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;
  database = firebase.database();
  userAuthenticated: EventEmitter<any> = new EventEmitter();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
    ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, rollNumber: string, username:string, password: string) {
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.writeUserData(username, email, rollNumber);
        console.log('You are Successfully signed up!', res);
        this.router.navigate(['/profile']);
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully logged in!');
        this.router.navigate(['/profile']);
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut();
  }

  writeUserData(username, email, rollNumber) {
    firebase.database().ref('users/' + username).set({
      username: username,
      email: email,
      rollNumber:  rollNumber
    });
  }

  getUserAuthState(): any{
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuthenticated.emit(null);
      } else {
      }
    });
  }

}
