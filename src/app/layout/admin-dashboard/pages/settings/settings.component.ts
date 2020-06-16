import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  username = "username";
  email = "e-mail";
  department = "Select your depatment";
  password: string;
  cPassword: string;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.username = firebase.auth().currentUser.displayName;
    this.email = firebase.auth().currentUser.email;
  }

  setChanges() {
    if(this.password != null && this.cPassword != "null") {
      if(this.password.length < 6) {
        alert("Minimum password lenght should be 6 characters")
      } else if (this.password == this.cPassword){
        this.auth.updatePassword(this.password);
      } else {
        alert("Password does not match")
      }
    }

    firebase.database().ref('users/' + "admin" + "/" + firebase.auth().currentUser.uid).update({
      department: this.department
    });

  }

}
