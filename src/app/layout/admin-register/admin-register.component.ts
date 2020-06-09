import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  cPassword: string;
  forms = document.getElementsByClassName('needs-validation');
  valid: boolean = false;
  department: string = "Select the department";

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.getUserAuthState();
    this.auth.userAuthenticated
    .subscribe(() => {
      this.router.navigate(['/profile'])
    });
    'use-strict';
    (function () {
      window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();
  }

  signUp() { 
    this.validations();
    console.log(this.valid);
    if (this.valid) {
      this.auth.SignUp(this.email, null, this.username, this.password, this.department, "admin");
    }
    this.email = '';
    this.username = ''
    this.password = '';
  }

  validations() {
    this.checkPasswordMatch();
    this.checkEmailMatch();
  }

  checkPasswordLength(){
    if(this.password.length < 6) {
      document.getElementById("passwordInputValidation").style.color = "red";
      document.getElementById("passwordInputValidation").style.display = "block";
      this.valid = false;
    } else if(this.password.length >=6){
      document.getElementById("passwordInputValidation").style.display = "none";
      this.valid = true;
    }
  }

  checkPasswordMatch() { 
    if (this.password == this.cPassword && this.cPassword != "" ) {
      document.getElementById("confirmPasswordInput").style.color = "green";
      document.getElementById("confirmPasswordInputValidationSpan").style.color = "green";
      document.getElementById("confirmPasswordInputValidationSpan").classList.remove("fa", "fa-close");
      document.getElementById("confirmPasswordInputValidationSpan").classList.add("fa", "fa-check");
      document.getElementById("confirmPasswordInputValidation").style.display = "none";
      document.getElementById("passwordInputValidation").style.display = "none";
      this.valid = true;
    } else {
      document.getElementById("confirmPasswordInput").style.color = "red";
      document.getElementById("confirmPasswordInputValidation").style.display = "block";
      document.getElementById("confirmPasswordInputValidation").style.color = "red";
      document.getElementById("confirmPasswordInputValidationSpan").style.color = "red";
      document.getElementById("confirmPasswordInputValidationSpan").classList.add("fa", "fa-close");
      this.valid=false;
    }
    this.checkPasswordLength();
  }

  checkEmailMatch() { 
    const pattern = /@hbtu.ac.in/;
    const isValid = pattern.test(this.email);
    if (isValid) {
      document.getElementById("emailInput").style.color = "green";
      document.getElementById("emailInputValidationSpan").style.color = "green";
      document.getElementById("emailInputValidationSpan").classList.remove("fa", "fa-close");
      document.getElementById("emailInputValidationSpan").classList.add("fa", "fa-check");
      document.getElementById("emailInputValidation").style.display = "none";
      this.valid = true;
    } else {
      document.getElementById("emailInput").style.color = "red";
      document.getElementById("emailInputValidation").style.display = "block";
      document.getElementById("emailInputValidation").style.color = "red";
      document.getElementById("emailInputValidationSpan").style.color = "red";
      document.getElementById("emailInputValidationSpan").classList.add("fa", "fa-close");
      this.valid = false;
    }
  }
}
