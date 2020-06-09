import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  password;
  email;

  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.auth.getUserAuthState();
    this.auth.userAuthenticated
    .subscribe(() => {
      this.router.navigate(['/adminProfile'])
    });
  }

  signIn() {
    this.auth.SignIn(this.email, this.password, "admin");
    this.email = '';
    this.password = '';
  }


}
