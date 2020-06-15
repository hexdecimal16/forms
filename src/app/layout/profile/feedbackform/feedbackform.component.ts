import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../../../auth/auth.service'

@Component({
  selector: 'app-feedbackform',
  templateUrl: './feedbackform.component.html',
  styleUrls: ['./feedbackform.component.css']
})
export class FeedbackformComponent implements OnInit {

  isVerified;
  question1; question2; question3; question4; question5; question6; question7; question8; question9; question10;
  question11; question12; question13; question14; question15; question16; question17; question18; question19;
  question20; question21; question22; question23; question24; question25;
  question26; question27; question28;
  valid: boolean = false;
  department;
  username;

  
  constructor(private auth: AuthService) { 
    //Initialise value as null
    this.question1 = null;
    this.question2 = null;
    this.question3 = null;
    this.question4 = null;
    this.question5 = null;
    this.question6 = null
    this.question7 = null;
    this.question8 = null;
    this.question9 = null;
    this.question10 = null;
    this.question11 = null;
    this.question12 = null;
    this.question13 = null;
    this.question14 = null;
    this.question15 = null;
    this.question16 = null;
    this.question17 = null;
    this.question18 = null;
    this.question19 = null;
    this.question20 = null;
    this.question21 = null;
    this.question22 = null;
    this.question23 = null;
    this.question24 = null;
    this.question25 = null;
    this.question26 = null;
    this.question27 = null;
    this.question28 = null;
  }

  ngOnInit(): void {
    // Email verification disabled for testing
    // this.isVerified = firebase.auth().currentUser.emailVerified;
    // console.log(this.isVerified);
    // if (!this.isVerified) {
    //   document.getElementById("feedbackForm").style.display = "none";
    //   document.getElementById("emailVerification").style.display = "block";
    // } else {
    //   document.getElementById("feedbackForm").style.display = "block";
    //   document.getElementById("emailVerification").style.display = "none";
    // }
  }

  resendVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(() => {
      alert("Verification email sent");
    }).catch(function (error) {
      alert("Verification email failed");
    });
  }

  submitFeedback() {
    this.verification();
    if (this.valid) {
      this.username = firebase.auth().currentUser.displayName;
      firebase.database().ref('/users/student/' + this.username).once('value')
      .then((snapshot) => {
        this.department = snapshot.val().department;
        firebase.database().ref('/feedback/' + this.department + "/" + this.username ).set({
          username: this.username,
          question1: this.question1,
          question2: this.question2,
          question3: this.question3,
          question4: this.question4,
          question5: this.question5,
          question6: this.question6,
          question7: this.question7,
          question8: this.question8,
          question9: this.question9,
          question10: this.question10,
          question11: this.question11,
          question12: this.question12,
          question13: this.question13,
          question14: this.question14,
          question15: this.question15,
          question16: this.question16,
          question17: this.question17,
          question18: this.question18,
          question19: this.question19,
          question20: this.question20,
          question21: this.question21,
          question22: this.question22,
          question23: this.question23,
          question24: this.question24,
          question25: this.question25,
          question26: this.question26,
          question27: this.question27,
          question28: this.question28
        }, (error) => {
          if(error) {
            alert("Sorry cannot send your feedback");
          } else {
            alert("Feedback sent successfully");
            this.auth.SignOut();
          }
        });
      });
    }
    // this.question1 = null;
    // this.question2 = null;
    // this.question3 = null;
    // this.question4 = null;
    // this.question5 = null;
    // this.question6 = null
    // this.question7 = null;
    // this.question8 = null;
    // this.question9 = null;
    // this.question10 = null;
    // this.question11 = null;
    // this.question12 = null;
    // this.question13 = null;
    // this.question14 = null;
    // this.question15 = null;
    // this.question16 = null;
    // this.question17 = null;
    // this.question18 = null;
    // this.question19 = null;
    // this.question20 = null;
    // this.question21 = null;
    // this.question22 = null;
    // this.question23 = null;
    // this.question24 = null;
    // this.question25 = null;
    // this.question26 = null;
    // this.question27 = null;
    // this.question28 = null;
  }

  verification() {
    if(this.question1  != null && this.question2 != null && this.question3  != null && this.question4 != null &&
      this.question5  != null && this.question6 != null && this.question7  != null && this.question8 != null &&
      this.question9  != null && this.question10 != null && this.question11  != null && this.question12 != null && 
      this.question13  != null && this.question14 != null && this.question15  != null && this.question16 != null && 
      this.question17  != null && this.question18 != null && this.question19  != null && this.question20 != null &&
      this.question21  != null && this.question22 != null && this.question23  != null && this.question24 != null &&
      this.question25 && this.question26  != null && this.question27 != null && this.question28  != null) {
      this.valid = true;
    } else {
      alert("Please fill all response");
      this.valid = false;
    }
  }
}
