import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {

  constructor(private formBuilder: FormBuilder) { }

  createLoginForm(){
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
