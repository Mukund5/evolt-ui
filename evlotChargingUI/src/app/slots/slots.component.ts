import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  //imports:[],
//  standalone: true
})
export class SlotsComponent implements OnInit {

  @ViewChild('closebutton') closebutton;

  portForm = new FormGroup({
    chargingType: new FormControl("")
        //password: new FormControl("")
      });

  constructor(private http: HttpClient,private searchComponent:SearchComponent,
     private transferChargingStationService: TransferChargingStationService,
     private router:Router,private transferSelectedDateService: TransferSelectedDateService,
     private transferSelectedPortSpeedService:TransferSelectedPortSpeedService,
     private transferSelectedSlotService: TransferSelectedSlotService,
     private fb: FormBuilder,private transferBookingService:TransferBookingService) { }
  public tableData1: TableData;

  public selectedChargeStation:ChargingStationObject;

  public showChargingSlots:Boolean=false;
  durationsList=[];
  availableSlotsValue:number;
  selectedDuration;

  public onSave() {
    this.closebutton.nativeElement.click();
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

    this.checkSlotsAvailability();
    this.transferSelectedSlotService.clearSelectedSlot();
    this.durationsList=[];
    this.availableSlotsValue=0;
    this.selectedDuration=undefined;
   
    this.tableData1 = {
      headerRow: [ 'Start Time','','','','',''],
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

  chargingSlotsList:ChargingSlotObject[]=[];


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


onChargingSlotSelect(chargingSlot:ChargingSlotObject){

    console.log('inside onChargingSlotSelect with slot: '+JSON.stringify(chargingSlot));
this.transferSelectedSlotService.setSelectedSlot(chargingSlot);
for (let index = 0; index < this.chargingSlotsList.length; index++) {
  var obj = this.chargingSlotsList[index];
 // console.log('charging slot: '+JSON.stringify(obj));

 if(obj.startTime===chargingSlot.startTime)
 {
  console.log('Match found: '+JSON.stringify(obj));

  var tempIndex=index;
  var availableSlots:number=0;
  while(tempIndex<index+4 && tempIndex<this.chargingSlotsList.length)
  {
    console.log('Iteration '+(tempIndex-index));
    if(this.chargingSlotsList[tempIndex].status==='Available')
    {
      availableSlots++;
    }
    else
    break;

    ++tempIndex;
  }
  console.log('Available slots:'+availableSlots);

  this.availableSlotsValue=availableSlots;

  if(availableSlots==0)
  this.durationsList=[];
else if(availableSlots==1)
this.durationsList=['Half an hour'];
else if(availableSlots==2)
  this.durationsList=['Half an hour','1 hour'];
 else if(availableSlots==3)
 this.durationsList=['Half an hour','1 hour','1.5 hours'];
  else if(availableSlots==4)
  this.durationsList=['Half an hour','1 hour','1.5 hours','2 hours'];

 }


}
  }

  durationChange(selectedDurationVal)
  {
console.log('Duration selected value: '+JSON.stringify(selectedDurationVal));
this.selectedDuration=selectedDurationVal;
  }


  checkAllInputPresent()
  {
    
    console.log('entered checkAllInputPresent');
    console.log('getSelectedSlot: '+JSON.stringify(this.transferSelectedSlotService.getSelectedSlot()));
    console.log('selectedDuration: '+JSON.stringify(this.selectedDuration));

    if(this.transferSelectedSlotService.getSelectedSlot()===undefined || 
    !this.isValidString(this.transferSelectedSlotService.getSelectedSlot().startTime) 
    )
 {
  this.showNotification('top','center','Select Slot Start Time');
 }
 else if(this.selectedDuration===undefined || this.selectedDuration==='undefined' || 
  this.selectedDuration==='Choose Duration' ||
 !this.isValidString(this.selectedDuration) 
 )
{
this.showNotification('top','center','Select Duration');
}
 else
 {
  console.log('To show confirmation popup for booking');

  var startTime=this.transferSelectedSlotService.getSelectedSlot().startTime;

  var date1 = new Date('01/01/1970 '+startTime);

  var dura:number;
  if(this.selectedDuration==='Half an hour')
  dura=1;
  else if(this.selectedDuration==='1 hour')
  dura=2;
  else if(this.selectedDuration==='1.5 hours')
  dura=3;
  else if(this.selectedDuration==='2 hours')
  dura=4;

  var date2 = new Date(date1.getTime() + dura*30*60000);
  //var date2=date1.getMilliseconds()+30000;
  console.log('Starting time:'+date1);
  console.log('Ending time:'+date2);

var startHourStr:String,endHourStr:String,startMinStr:String,endMinStr:String;
if(date1.getHours()<10)
startHourStr="0"+date1.getHours().toString();
else
startHourStr=date1.getHours().toString();

if(date1.getMinutes()<10)
startMinStr="0"+date1.getMinutes().toString();
else
startMinStr=date1.getMinutes().toString();


if(date2.getHours()<10)
endHourStr="0"+date2.getHours().toString();
else
endHourStr=date2.getHours().toString();

if(date2.getMinutes()<10)
endMinStr="0"+date2.getMinutes().toString();
else
endMinStr=date2.getMinutes().toString();


  console.log('starting time hh:mm:'+startHourStr+":"+startMinStr);
  console.log('ending time hh:mm:'+endHourStr+":"+endMinStr);

  
  const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
    
  this.http.post('http://localhost:8080/evolt/charging/bookChargingAppt',
   { 
    user_id: sessionStorage.getItem('logged_in_user_id'),
    charging_point_id: this.transferSelectedPortSpeedService.getSelectedPort().chargingPointId.toString(),
    selected_charging_type:this.transferSelectedPortSpeedService.getSelectedSpeed(),
    appointment_date: this.transferSelectedDateService.getSelectedDate(),
    appointment_start_time:startHourStr+":"+startMinStr,
    appointment_end_time:endHourStr+":"+endMinStr
  },
  {
      headers: headerValues
  })
    .subscribe(data => {
      // handle the data
      console.log('slots data response: '+JSON.stringify(data));

      if(data['responseStatus']!='SUCCESS')
      {
        console.log('Error message: '+JSON.stringify(data['errorMessage']));
        this.showNotification('top','center',data['errorMessage']);
        this.showChargingSlots=false;
      }
      else
      {
        this.showNotification('top','center','Application Booked Successfully!');
        this.transferBookingService.setBookingObject(data['responseData']);
        this.transferSelectedSlotService.clearSelectedSlot();
        this.durationsList=[];
        this.availableSlotsValue=0;
        this.selectedDuration=undefined;
        this.chargingSlotsList=[];
        this.checkSlotsAvailability();
        this.router.navigateByUrl('/confirmation');

      } 
    });
 



 }
  

  }
  checkSlotsAvailability()
  {
    console.log('entered checkSlotsAvailability');

    if(this.transferSelectedPortSpeedService.getSelectedPort()===undefined || 
    !this.isValidString(this.transferSelectedPortSpeedService.getSelectedPort().chargingPointId.toString()) ||
    !this.isValidString(this.transferSelectedPortSpeedService.getSelectedSpeed()))
 {
  this.showNotification('top','center','Select Charging type');
 }
 else
 {
  
  const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
    
  this.http.post('http://localhost:8080/evolt/charging/getChargingApptDetails',
   { 
    charging_point_id: this.transferSelectedPortSpeedService.getSelectedPort().chargingPointId.toString(),
    appointment_date: this.transferSelectedDateService.getSelectedDate()
  },
  {
      headers: headerValues
  })
    .subscribe(data => {
      // handle the data
      console.log('slots data response: '+JSON.stringify(data));

      if(data['responseStatus']!='SUCCESS')
      {
        console.log('Error message: '+JSON.stringify(data['errorMessage']));
        this.showNotification('top','center',data['errorMessage']);
        this.showChargingSlots=false;
      }
      else
      {

        this.showChargingSlots=true;
        console.log('response data: '+JSON.stringify(data['responseData']));
        var slotsRespList=data['responseData'];
        console.log('charging slots: '+JSON.stringify(this.chargingSlotsList));

        
        for (let index = 0; index < slotsRespList.length; index++) {
          var obj = slotsRespList[index];
          console.log('charging slot: '+JSON.stringify(obj));

          var newObj:ChargingSlotObject={
            startTime:'',
          endTime:'',
        status:'',
        maxDuration:''
      };
          newObj.startTime=obj['startTime'];
          newObj.endTime=obj['endTime'];
          newObj.status=obj['slotStatus'];
          this.chargingSlotsList.push(newObj);

      
        }

        console.log('Final slots list obj: '+JSON.stringify(this.chargingSlotsList));

      } 
    });
 }
  }

}
