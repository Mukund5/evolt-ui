import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TransferChargingStationService } from 'app/TransferChargingStation.service';
import { ChargingStationObject } from 'app/chargingStationObject';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TransferSelectedDateService } from 'app/TransferSelectedDate.service';
import { Router } from '@angular/router';

declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  
  //imports:[MatFormFieldModule, MatInputModule, MatDatepickerModule],
  //standalone: true
})

@Injectable({
    providedIn: 'root'
  })
  
export class SearchComponent implements OnInit {

    searchForm = new FormGroup({
        pincode: new FormControl("")
        //password: new FormControl("")
      });

      selectedDate:String="";

     @Output() stationSelected=new EventEmitter<ChargingStationObject>();

  constructor(private http: HttpClient,private transferChargingStationService: TransferChargingStationService,
    private transferSelectedDateService: TransferSelectedDateService,private router:Router) { }
  public tableData1: TableData;

  public showChargingStations:Boolean=false;

  ngOnInit() {

    this.selectedDate="";
    
    this.tableData1 = {
      headerRow: [ 'Station ID', 'Station Name', 'Address', 'District', 'State','Geo Location'],
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

  chargingStationsList:ChargingStationObject[];

  public onDateChange(event) {
    console.log('testing val: '+$('#myDateValue1').val());
    var newDate=Date.parse($('#myDateValue1').val());
    console.log('Newly parsed date:'+newDate);
    // console.log('Teste: '+ event.value);
    // var parsedDate=Date.parse(event.value.toString());
    // console.log('parsedDate: '+parsedDate);
    const dateValue = new Date(newDate);

var receivedDate=event.value;

var month:Number=dateValue.getMonth()+1;
var monthStr:String;
switch(month)
{
    case 1:
        monthStr="Jan";
        break;
    case 2:
        monthStr="Feb";
        break;
    case 3:
        monthStr="Mar";
        break;
    case 4:
        monthStr="Apr";
        break;
    case 5:
        monthStr="May";
        break;
    case 6:
        monthStr="Jun";
        break;
    case 7:
        monthStr="Jul";
        break;
    case 8:
        monthStr="Aug";
        break;
    case 9:
        monthStr="Sep";
        break;
    case 10:
        monthStr="Oct";
        break;
    case 11:
        monthStr="Nov";
        break;
    case 12:
        monthStr="Dec";
        break;
}

var dateStr:String;
if(dateValue.getDate()<10)
dateStr="0"+dateValue.getDate().toString();
else
dateStr=dateValue.getDate().toString();

var myDate=dateStr+"-"+monthStr+"-"+dateValue.getFullYear();

this.transferSelectedDateService.setSelectedDate(myDate);
console.log('mydate: '+myDate);
this.selectedDate=myDate;
console.log('date:'+dateValue.getDate());
console.log('month:'+dateValue.getMonth());
console.log('correct month:'+monthStr);
console.log('year:'+dateValue.getFullYear());
    
  }

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
ngAfterContentInit()
  {
    console.log('checking if session present');

 if(!this.isValidString(sessionStorage.getItem('logged_in_user_id')))
 {
  this.showNotification('top','center','No valid session found');
  this.router.navigateByUrl('/login');
 }
 
  }

  searchByPincode()
  {
    
      console.log("Entered search by pincode with pincode: "+this.searchForm.value['pincode']);
      

      if(!this.isValidString(this.searchForm.value['pincode'].toString()))
      {
        this.showNotification('top','center','Enter a valid pincode');
        this.showChargingStations=false;
      }
      else if(!this.isValidString(this.selectedDate))
      {
        this.showNotification('top','center','Please select a Date');
        this.showChargingStations=false;
      }
      else
      {
        if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
        {
          const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
    
        this.http.post('http://localhost:8080/evolt/charging/getChargingStations', { pincode: this.searchForm.value['pincode'].toString()},
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
              this.showChargingStations=false;
            }
            else
            {
              console.log('response data: '+JSON.stringify(data['responseData']));
              this.chargingStationsList=data['responseData'];
              console.log('charging stations: '+JSON.stringify(this.chargingStationsList));
  
              this.showChargingStations=true;
              for (let index = 0; index < this.chargingStationsList.length; index++) {
                var obj = this.chargingStationsList[index];
                console.log('charging station id: '+obj.chargingStationId);
            
              }
  
            } 
          });
        }
        else 
        {
          this.showNotification('top','center','No valid session found');
          this.showChargingStations=false;
        }
      }
      
      
    
  }

  selectedChargingStation(chargingStation:ChargingStationObject)
  {
    console.log("Entered selectedChargingStation with obj: "+JSON.stringify(chargingStation));
    this.stationSelected.emit(chargingStation);
    this.transferChargingStationService.setChargingStation(chargingStation);
    //this.recipeService.recipeSelected.emit(this.recipeVal);
  }

}
