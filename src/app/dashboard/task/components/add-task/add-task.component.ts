import {Component, Inject, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TaskState} from "../../../shared/enums/task-state";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Task} from "../../models/task";
import {User} from "../../../user/models/user";
import {TaskFormService} from "../../services/task-form.service";
import {TaskDialogData} from "../../models/task-dialog-data";

@Component({
  selector: 'app-add',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit{
  taskForm!: FormGroup;
  isEdit!: boolean;
  userList: User[] = [];
  states!: TaskState[];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private taskFormService: TaskFormService,
  ) {
  }

  ngOnInit(){
    this.isEdit = this.data.edit;
    this.initForm(this.data.task);
    this.userList = this.data.users;
    this.setupStateOptions();
    console.log(this.data);
}

  private initForm(task: Task): void {
    this.taskForm = this.taskFormService.initializeForm(task, this.isEdit);
  }

  private setupStateOptions(): void {
    let assignedUser = this.taskForm.get("assignedUser");
    if(assignedUser?.value){
      this.states = [TaskState.queue, TaskState.progress, TaskState.done];
    } else{
      this.states = [TaskState.queue];
    }
    this.taskForm.get("assignedUser")?.valueChanges.subscribe(assignedUser => {
      if (assignedUser) {
        this.states = [TaskState.queue, TaskState.progress, TaskState.done];
      } else {
        this.states = [TaskState.queue];
      }
    });
  }


  onAdd(): void {
    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

