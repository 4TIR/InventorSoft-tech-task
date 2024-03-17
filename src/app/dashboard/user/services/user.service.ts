import {Injectable} from '@angular/core';
import {User} from "../models/user";
import {Task} from "../../task/models/task";
import {TaskState} from "../../shared/enums/task-state";
import {forkJoin, map, Observable} from "rxjs";
import {TaskService} from "../../task/services/task.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private taskService:TaskService) { }

  getUsers(): Observable<User[]> {
    return new Observable<User[]>((observer) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      observer.next(users);
      observer.complete()
    })

  }

  loadUsers(): Observable<User[]> {
    return forkJoin({
      tasks: this.taskService.getTasks(),
      users: this.getUsers()
    }).pipe(
      map(({ tasks, users }) => {
        return users.map(user => {
          const userTasks = tasks.filter(task => task?.assignedUser === user.id);
          return { ...user, tasks: userTasks };
        });
      })
    );
  }

  addUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...user });
      localStorage.setItem('users', JSON.stringify(users));
      observer.next(user);
      observer.complete()
    })

  }
  updateUser(user: User): Observable<User> {
    return new Observable<User>((observer) => {
      let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index].name = user.name;
        localStorage.setItem('users', JSON.stringify(users));
        observer.next(user);
        observer.complete()
      } else {
        observer.error('User is not exist')
      }
    })

  }
  //
  deleteUser(userId: number): Observable<number> {
    return new Observable<number>((observer) => {
      let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      users = users.filter(u => u.id !== userId);
      localStorage.setItem('users', JSON.stringify(users));
      let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.forEach(task =>{
        if(task.assignedUser === userId){
          task.state = TaskState.queue;
          task.assignedUser = undefined;
        }
      })
      localStorage.setItem('tasks', JSON.stringify(tasks));
      observer.next(userId);
      observer.complete()
    })
  }


}
