import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import { ListSettingsComponent } from './components/list-settings/list-settings.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { DeleteConfirmationDialogComponent } from '../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {SharedModule} from "../shared/shared.module";
import {AddUserComponent} from "./components/add-user/add-user.component";
import {ListUserComponent} from "./components/list-user/list-user.component";


@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent,
    ListSettingsComponent,
    DeleteConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class UserModule { }
