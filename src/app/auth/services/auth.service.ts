import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {Login} from "../models/login";
import {Signup} from "../models/signup";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(private router: Router) { }

  login(credentials: Login): Observable<boolean> {
    if (this.isValidUser(credentials)) {
      const token = this.generateRandomToken();
      localStorage.setItem('access_token', token);
      this.loggedIn.next(true);
      return new Observable<boolean>((observer) => {
        observer.next(true);
        observer.complete();
      });
    } else {
      return new Observable<boolean>((observer) => {
        observer.next(false);
        observer.error('Username or password is incorrect');
        observer.complete();
      });
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login'])
  }

  register(userData: Signup): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let users: Login[] = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const existingUser = users.find(user => user.username === userData.username);
      if(existingUser){
        observer.error('Username already exists');
      } else{
        users.push(userData);
        localStorage.setItem('registered_users', JSON.stringify(users));
        observer.next(true);
        observer.complete();
      }
    });
  }

  private isValidUser(credential:Login): boolean {
    const users: Login[] = JSON.parse(localStorage.getItem('registered_users') || '[]');
    return users.some(user => user.username === credential.username && user.password === credential.password);
  }

  private generateRandomToken(): string {
    const randomToken = Math.random().toString(36).substring(2);
    return randomToken;
  }
}
