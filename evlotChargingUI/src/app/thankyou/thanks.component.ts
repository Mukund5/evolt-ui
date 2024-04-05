import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingObject } from 'app/BookingObject';
import { ChargingPortObject } from 'app/ChargingPortObject';
import { ChargingSlotObject } from 'app/ChargingSlotObject';
import { TransferBookingService } from 'app/TransferBooking.service';
import { TransferChargingStationService } from 'app/TransferChargingStation.service';
import { TransferSelectedDateService } from 'app/TransferSelectedDate.service';
import { TransferSelectedPortSpeedService } from 'app/TransferSelectedPortSpeed.service';
import { TransferSelectedSlotService } from 'app/TransferSelectedSlot.service';
import { ChargingStationObject } from 'app/chargingStationObject';
import { SearchComponent } from 'app/search/search.component';

declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
  //imports:[],
//  standalone: true
})
export class ThanksComponent implements OnInit {

  

  portForm = new FormGroup({
    chargingType: new FormControl("")
        //password: new FormControl("")
      });

  constructor(private http: HttpClient,
     private router:Router,private transferBookingService:TransferBookingService,private fb: FormBuilder) { }
  public tableData1: TableData;

  public bookingObject:BookingObject;

  viewBookings()
  {
    this.router.navigateByUrl('/bookings');
  }

  ngAfterContentInit()
  {
    console.log('checking if session present');

 if(!this.isValidString(sessionStorage.getItem('logged_in_user_id')))
 {
  this.showNotification('top','center','No valid session found');
  this.router.navigateByUrl('/login');
 }
 
  }

  ngOnInit() {

    this.bookingObject=this.transferBookingService.getBookingObject();
    console.log('Received booking object:'+JSON.stringify(this.bookingObject));

  }

  


  isValidString(strEntry):Boolean {
    var response:Boolean;
    if(strEntry===null || strEntry===undefined){
        console.log('String is null');
        response=false;
    }
    else if (strEntry.trim().length === 0) {
      console.log('String is empty');
      response=false;
    } else {
      console.log('String is NOT empty');
      response=true;
    }
    return response;
  }

  showNotification(from, align,messageValue){
    const type = ['','info','success','warning','danger'];

    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({
        //icon: "pe-7s-gift",
        message: messageValue
    },{
        type: type[color],
        timer: 1000,
        placement: {
            from: from,
            align: align
        }
    });
}


}
