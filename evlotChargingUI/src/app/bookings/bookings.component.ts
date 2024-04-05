import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingObject } from 'app/BookingObject';
import { VehicleDetailsObject } from 'app/vehicleDetailsObj';
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  //imports:[],
//  standalone: true
})
export class BookingsComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }
  public tableData1: TableData;
  public showAddVehicleSection:Boolean=false;
  public brandList=['Tata Motors','Hyndai Inc','Mahindra Corp','Ola Electrical','Maruti Suzuki'];

  public showModelsSection:Boolean=false;
  public modelList=[];
  public selectedVehicleId:String="";

  
  vehicleForm = new FormGroup({
    registration: new FormControl("")
    
  });

  bookAppointment()
  {
    this.router.navigateByUrl('/search');
  }

  ngOnInit() {
    this.listUserBookings();
    this.tableData1 = {
      headerRow: [ 'Booking ID', 'Charging Point ID', 'Status', 'Charging type', 'Total Fare(Rs)','Address','Date','Start Time','End Time'],
      dataRows: [
          ['1', 'Dakota Rice', 'Niger', 'Oud-Turnhout', '$36,738'],
          ['2', 'Minerva Hooper', 'Curaçao', 'Sinaai-Waas', '$23,789'],
          ['3', 'Sage Rodriguez', 'Netherlands', 'Baileux', '$56,142'],
          ['4', 'Philip Chaney', 'Korea, South', 'Overland Park', '$38,735'],
          ['5', 'Doris Greene', 'Malawi', 'Feldkirchen in Kärnten', '$63,542'],
          ['6', 'Mason Porter', 'Chile', 'Gloucester', '$78,615']
      ]
  };
  }

  bookingsList:BookingObject[];

  isValidString(strEntry):Boolean {
    var response:Boolean;
    if(strEntry===null){
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

  listUserBookings()
  {
    
      console.log("Entered listUserBookings");
  
      if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
      {
        const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/user/getUserBookings', { user_id: sessionStorage.getItem('logged_in_user_id')},
      {
          headers: headerValues
      })
        .subscribe(data => {
          // handle the data
          console.log('data response: '+JSON.stringify(data));
  
          if(data['responseStatus']!='SUCCESS')
          {
            console.log('Error message: '+JSON.stringify(data['errorMessage']));
            this.showNotification('top','center',data['errorMessage']);
          }
          else
          {
            console.log('response data: '+JSON.stringify(data['responseData']));
            this.bookingsList=data['responseData'];
            console.log('bookings details: '+JSON.stringify(this.bookingsList));

            // for (let index = 0; index < this.vehicleDetailsList.length; index++) {
            //   var obj = this.vehicleDetailsList[index];
            //   console.log('vehicle detail id: '+obj.vehicleDetailId);
              
            // }

          } 
        });
      }
      else 
      {
        //this.showNotification('top','center','No valid session found');
      }
      
    
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


}
