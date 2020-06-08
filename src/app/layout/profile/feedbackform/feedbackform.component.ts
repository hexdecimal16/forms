import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css']
})
export class FeedbackformComponent implements OnInit {

  isVerified;

  constructor() { }

  ngOnInit(): void {
    this.isVerified = firebase.auth().currentUser.emailVerified;
    console.log(this.isVerified);
    if(!this.isVerified) {
        document.getElementById("feedbackForm").style.display = "none";
        document.getElementById("emailVerification").style.display = "block";
    } else {
      document.getElementById("feedbackForm").style.display = "block";
        document.getElementById("emailVerification").style.display = "none";
    }
  }

  resendVerification(){
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      alert("Verification email sent");
    }).catch(function(error) {
      alert("Verification email failed");
    });
  }
}
