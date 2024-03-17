import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../task/models/task";
import {TaskFormData} from "../../task/models/task-form-data";
import {TaskState} from "../../shared/enums/task-state";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(private formBuilder: FormBuilder) { }

  initializeForm(data:User, isEdit: boolean): FormGroup {
    const formData: User = {
      id: isEdit ? data.id : Date.now(),
      name: isEdit ? data.name : '',
    };

    return this.formBuilder.group({
      id: [formData.id],
      name: [formData.name, Validators.required],
    });
  }
}
