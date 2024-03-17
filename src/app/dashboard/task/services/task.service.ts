import { Injectable } from '@angular/core';
import {Task} from "../models/task";
import {map, Observable} from "rxjs";
import {TaskState} from "../../shared/enums/task-state";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  getTasks(): Observable<Task[]> {
    return new Observable<Task[]>((observer) => {
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      observer.next(tasks);
      observer.complete();
    })
  }

  addTask(task: Task): Observable<Task> {
    return new Observable<Task>((observer) => {
      const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      observer.next(task);
      observer.complete();
    })

  }

  updateTask(task: Task): Observable<Task> {
    return new Observable<Task>((observer) => {
      let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      const index = tasks.findIndex(u => u.id === task.id);
      if (index !== -1) {
        tasks[index] = task;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        observer.next(task);
        observer.complete();
      } else{
        observer.error('Task not found');
      }
    })

  }

  deleteTask(taskId: number): Observable<number> {
    return new Observable<number>((observer) => {
      let tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks = tasks.filter(task => task.id !== taskId);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      observer.next(taskId);
      observer.complete();
    })
  }

  isUserAssignedToTaskInProgress(userId: string | number | undefined,taskId?:number): Observable<boolean> {
    return this.getTasks().pipe(
      map(tasks => tasks.some(task => task.assignedUser === userId && task.state === TaskState.progress && task.id !== taskId))
    );
  }
}
