import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TransferSelectedDateService {

  
  constructor(
    private router:Router
    
  ) { }

  private selectedDate:String;

  setSelectedDate(data){
    this.selectedDate = data;
  }

  getSelectedDate(){
    let temp = this.selectedDate;
        return temp;
  }

  clearSelectedDate(){
    this.selectedDate = undefined;
  }

}