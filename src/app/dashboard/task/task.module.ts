import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {SharedModule} from "../shared/shared.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {ListSettingsComponent} from "./components/list-settings/list-settings.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AddTaskComponent} from "./components/add-task/add-task.component";
import {ListTaskComponent} from "./components/list-task/list-task.component";


@NgModule({
  declarations: [
    ListTaskComponent,
    AddTaskComponent,
    ListSettingsComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class TaskModule { }
