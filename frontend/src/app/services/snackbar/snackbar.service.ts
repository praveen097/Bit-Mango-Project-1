import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBarService:MatSnackBar) { }

  showSnackBar(message:string){
    this._snackBarService.open(message,undefined,{duration:4000});
  }
}
