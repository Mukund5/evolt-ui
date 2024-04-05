import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChargingSlotObject } from './ChargingSlotObject';
import { BookingObject } from './BookingObject';


@Injectable({
  providedIn: 'root'
})
export class TransferBookingService {

  
  constructor(
    private router:Router
    
  ) { }

  private bookingObject:BookingObject;
  

  setBookingObject(data){
    this.bookingObject = data;
  }

  getBookingObject(){
    let temp = this.bookingObject;
        return temp;
  }

  clearBookingObject(){
    this.bookingObject = undefined;
  }

  

}