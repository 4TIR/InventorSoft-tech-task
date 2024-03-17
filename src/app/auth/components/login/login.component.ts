import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {LoginFormService} from "../../services/login-form.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private authService: AuthService,private router: Router,private snackBarService:SnackbarService,private loginFormService:LoginFormService) {

  }
  ngOnInit() {
    this.loginForm = this.loginFormService.createLoginForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if(response){
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.snackBarService.openSnackBar(error);
          this.loginForm.reset();
        }
      );
    }
  }
}
