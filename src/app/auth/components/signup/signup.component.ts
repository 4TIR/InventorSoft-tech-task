import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SnackbarService} from "../../../shared/services/snackbar.service";
import {SignUpFormService} from "../../services/sign-up-form.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private signupService: SignUpFormService,private authService: AuthService,private router: Router,private snackBarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.registerForm = this.signupService.createSignupForm();
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response) => {
         if(response){
           this.snackBarService.openSnackBar('User has been successfully registered');
           this.router.navigate(['/login'])
         }
        },
        (error) => {
          this.snackBarService.openSnackBar(error);
        }
      );
    }
  }

}
