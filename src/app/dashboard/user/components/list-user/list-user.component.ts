import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/user";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {DeleteConfirmationDialogComponent} from "../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {TaskService} from "../../../task/services/task.service";
import {AddUserComponent} from "../add-user/add-user.component";

@Component({
  selector: 'app-list',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name','tasks','settings'];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog,private userService:UserService) {}

  ngOnInit(){
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadData(): void {
    this.userService.loadUsers().subscribe(users => {
        this.dataSource.data = users;
      },
    );
  }



  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: null
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.addUser(result).subscribe(res => {
            this.loadData();
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      }
    });
  }
  edit(user: User): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result) {
        this.userService.updateUser(result).subscribe(
          () => {
            this.loadData();
          },
          (error) => {
            console.error('Error editing user:', error);
          }
        );
      }
    });
  }

  remove(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          () => {
            this.loadData();
          },
          (error) => {
            console.error('Error deleting user:', error);
          }
        );
      }
    });
  }
}
