import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TaskState} from "../../shared/enums/task-state";
import {TaskFormData} from "../models/task-form-data";
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {

  constructor(private formBuilder: FormBuilder) { }

  initializeForm(data:Task, isEdit: boolean): FormGroup {
    const formData: TaskFormData = {
      id: isEdit ? data.id : Date.now(),
      name: isEdit ? data.name : '',
      description: isEdit ? data.description : '',
      creationDate: isEdit ? data.creationDate : Date.now(),
      modificationDate: Date.now(),
      state: isEdit ? data.state : TaskState.queue,
      assignedUser: isEdit? data.assignedUser : ''
    };

    return this.formBuilder.group({
      id: [formData.id],
      name: [formData.name, Validators.required],
      description: [formData.description, Validators.required],
      creationDate: [formData.creationDate, Validators.required],
      modificationDate: [formData.modificationDate, Validators.required],
      state: [formData.state, Validators.required],
      assignedUser: [formData.assignedUser]
    });
  }
}
