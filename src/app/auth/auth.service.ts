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
  SignUp(email: string, rollNumber: string, username: string, password: string, department: string, type: string) {
    console.log(type);
    this.angularFireAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        firebase.auth().currentUser.updateProfile({
          displayName: username
        });
        firebase.auth().currentUser.updateEmail(email);
        firebase.auth().currentUser.sendEmailVerification().then(() => {
          console.log("Verification email sent");
        }).catch(function (error) {
          console.log("Verification email faild");
        });
        this.writeUserData(username, email, rollNumber, department, type);
        console.log('You are Successfully signed up!', res);
        if (type == "student") {
          console.log("going profile");
          this.router.navigate(['/profile']);
        } else if(type === "admin") {
          console.log("going dashboard");
          this.router.navigate(['/adminDashboard']);
        }
      })
      .catch(error => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string, type: string) {
    this.angularFireAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('You are Successfully logged in!');
        if (type == "student") {
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/adminDashboard']);
        }
      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth
      .auth
      .signOut()
      .then(() => {
        this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });
      });

  }

  writeUserData(username, email, rollNumber, department, type: string) {
    firebase.database().ref('users/' + type + "/" + firebase.auth().currentUser.uid).set({
      username: username,
      email: email,
      rollNumber: rollNumber,
      department: department,
      type: type
    });
  }

  getUserAuthState(): any {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userAuthenticated.emit(null);
      } else {
      }
    });
  }

  updatePassword(password: string) {
    firebase.auth().currentUser.updatePassword(password).then(() => {
      alert("password set successfully");
    }).catch(function (error) {
      alert("Password cannot be changed right now");
    });
  }


}
