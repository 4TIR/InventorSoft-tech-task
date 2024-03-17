import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) { }

  openSnackBar(message:string){
    this.snackBar.open(message, 'Ok', {
      duration: 3000
    });
  }
}
