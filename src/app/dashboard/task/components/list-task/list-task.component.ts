import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {UserService} from "../../../user/services/user.service";
import {User} from "../../../user/models/user";
import {
  DeleteConfirmationDialogComponent
} from "../../../shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component";
import {filter, map, of, switchMap, tap} from "rxjs";
import {TaskState} from "../../../shared/enums/task-state";
import {AddTaskComponent} from "../add-task/add-task.component";
import {SnackbarService} from "../../../../shared/services/snackbar.service";

@Component({
  selector: 'app-list',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css']
})
export class ListTaskComponent implements OnInit,AfterViewInit{
  displayedColumns: string[] = ['name','description','creationDate','modificationDate','assignedUser','state','settings'];
  dataSource = new MatTableDataSource<Task>([]);
  userList: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tasksService:TaskService,private userService: UserService, public dialog: MatDialog,private snackBarService: SnackbarService) {}

  ngOnInit(){
    this.loadData();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  loadData(): void {
    this.tasksService.getTasks().subscribe(
      (tasks: Task[]) => {
        this.dataSource.data = tasks;
      }
    );
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.userList = users;
      }
    );
    this.dataSource.paginator = this.paginator;
  }
  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '500px',
      data: {
        edit: false,
        users: this.userList
      }
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result ),
      switchMap((result: Task) => {
        if (result && result.state === TaskState.progress) {
          return this.tasksService.isUserAssignedToTaskInProgress(result.assignedUser).pipe(
            map(isAssigned => ({ result, isAssigned }))
          );
        }
        return of({ result, isAssigned: false });
      }),
      tap(({ result, isAssigned }) => {
        if (!isAssigned) {
          this.tasksService.addTask(result).subscribe(() => {
            this.loadData();
          });
        } else {
          this.snackBarService.openSnackBar('User already has task in progress');
        }
      })
    ).subscribe();
  }
  edit(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '500px',
      data: {
        edit: true,
        users: this.userList,
        task: task
      }
    });
    dialogRef.afterClosed().pipe(
      filter(result => !!result ),
      switchMap((result: Task) => {
        if (result) {
          if (result.state === TaskState.progress) {
            return this.tasksService.isUserAssignedToTaskInProgress(result.assignedUser,result.id).pipe(
              map(isAssigned => ({ result, isAssigned }))
            );
          } else {
            return of({ result, isAssigned: false });
          }
        }
        return of({ result, isAssigned: false });
      }),
      tap(({ result, isAssigned }) => {
        if (!isAssigned || result.state !== TaskState.progress) {
          this.tasksService.updateTask(result).subscribe(() => {
            this.loadData();
          });
        } else {
          this.snackBarService.openSnackBar('User already has task in progress');
        }
      })
    ).subscribe();
  }
  //
  remove(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tasksService.deleteTask(id).subscribe(() =>{
          this.loadData();
        })
      }
    });
  }

  getUserName(userId: number): string {
    const user = this.userList.find(user => user.id === userId);
    return user ? user.name : '';
  }
}
