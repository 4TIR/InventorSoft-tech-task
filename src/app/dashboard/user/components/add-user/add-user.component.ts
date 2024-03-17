import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";
import {User} from "../../models/user";
import {UserFormService} from "../../services/user-form.service";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm!: FormGroup;
  isEdit!: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userFormService:UserFormService
  ) {

  }

  ngOnInit(){
    this.isEdit = !!this.data;
    this.initForm(this.data)
  }

  private initForm(user: User): void {
    this.userForm = this.userFormService.initializeForm(user, this.isEdit);
  }

  onAdd(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
