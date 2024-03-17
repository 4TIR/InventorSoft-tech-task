import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  constructor(private formBuilder: FormBuilder) { }

  createSignupForm(){
    return this.formBuilder.group({
      id:[Date.now()],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
}
