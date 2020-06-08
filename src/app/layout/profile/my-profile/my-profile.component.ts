import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  constructor(private auth: AuthService) { }
  username;
  email;
  rollNumber;
  password;
  cPassword;
  user;
  department: string = "Select your department";

  ngOnInit(): void {
    this.username = firebase.auth().currentUser.displayName;
    this.email = firebase.auth().currentUser.email;
    this.rollNumber = firebase.database().ref('/users/' + this.username).once('value')
    .then((snapshot) => {
      this.rollNumber = snapshot.val().rollNumber;
      this.department = snapshot.val().department;
    });

    console.log(this.rollNumber);
  }

}
