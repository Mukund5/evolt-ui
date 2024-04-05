import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChargingPortObject } from 'app/ChargingPortObject';
import { TransferChargingStationService } from 'app/TransferChargingStation.service';
import { TransferSelectedDateService } from 'app/TransferSelectedDate.service';
import { TransferSelectedPortSpeedService } from 'app/TransferSelectedPortSpeed.service';
import { ChargingStationObject } from 'app/chargingStationObject';
import { SearchComponent } from 'app/search/search.component';

declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-ports',
  templateUrl: './ports.component.html',
  styleUrls: ['./ports.component.css'],
  //imports:[],
//  standalone: true
})
export class PortsComponent implements OnInit {

  portForm = new FormGroup({
    chargingType: new FormControl("")
        //password: new FormControl("")
      });

  constructor(private http: HttpClient,private searchComponent:SearchComponent,
     private transferChargingStationService: TransferChargingStationService,
     private router:Router,private transferSelectedDateService: TransferSelectedDateService,
     private transferSelectedPortSpeedService:TransferSelectedPortSpeedService) { }
  public tableData1: TableData;

  public selectedChargeStation:ChargingStationObject;

  public showChargingPorts:Boolean=false;

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

    this.transferSelectedPortSpeedService.clearSelectedPort();
    this.transferSelectedPortSpeedService.clearSelectedSpeed();
    var receivedStation=this.transferChargingStationService.getChargingStation();
    console.log('New value received: '+JSON.stringify(receivedStation));
    if(receivedStation!=undefined)
      this.searchByChargingStationId(receivedStation);

    this.searchComponent.stationSelected.subscribe(
      (selectedStation:ChargingStationObject) => {
        this.selectedChargeStation=selectedStation;
        console.log("Received selected station object: "+JSON.stringify(this.selectedChargeStation));
        this.searchByChargingStationId(this.selectedChargeStation);

      }
    );
    
    this.tableData1 = {
      headerRow: [ 'Port ID', 'Rate Normal Charging', 'Rate Fast Charging', 'Rate Super Fast Charging'],
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

  chargingPortsList:ChargingPortObject[];


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

  searchByChargingStationId(selectedChargeStation:ChargingStationObject)
  {
    
      console.log("Entered search by charging station id with object: "+JSON.stringify(selectedChargeStation));
      
        if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
        {
          const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
    
        this.http.post('http://localhost:8080/evolt/charging/getChargingPortsDetails', { station_id: selectedChargeStation.chargingStationId.toString()},
        {
            headers: headerValues
        })
          .subscribe(data => {
            // handle the data
            console.log('port details data response: '+JSON.stringify(data));
    
            if(data['responseStatus']!='SUCCESS')
            {
              console.log('Error message: '+JSON.stringify(data['errorMessage']));
              this.showNotification('top','center',data['errorMessage']);
              this.showChargingPorts=false;
            }
            else
            {
              console.log('response data: '+JSON.stringify(data['responseData']));
              this.chargingPortsList=data['responseData'];
              console.log('charging ports: '+JSON.stringify(this.chargingPortsList));
  
              this.showChargingPorts=true;
              for (let index = 0; index < this.chargingPortsList.length; index++) {
                var obj = this.chargingPortsList[index];
                console.log('charging station id: '+obj.chargingPointId);
            
              }
  
            } 
          });
        }
        else 
        {
          this.showNotification('top','center','No valid session found');
          this.showChargingPorts=false;
        }
  }

  onChargingTypeChange(chargingPort:ChargingPortObject,chargingType:String){

    console.log('inside onChargingTypeChange with port: '+JSON.stringify(chargingPort)+' and chargingtype: '+chargingType);
this.transferSelectedPortSpeedService.setSelectedPort(chargingPort);
this.transferSelectedPortSpeedService.setSelectedSpeed(chargingType);
  }

  checkSlotsAvailability()
  {
    console.log('entered checkSlotsAvailability');
    console.log('this.transferSelectedPortSpeedService.getSelectedPort(): '+JSON.stringify(this.transferSelectedPortSpeedService.getSelectedPort()));
console.log('this.isValidString(this.transferSelectedPortSpeedService.getSelectedSpeed(): '+this.transferSelectedPortSpeedService.getSelectedSpeed());
    if(this.transferSelectedPortSpeedService.getSelectedPort()===undefined || 
    this.transferSelectedPortSpeedService.getSelectedPort().chargingPointId===undefined ||
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
        this.showChargingPorts=false;
      }
      else
      {
        this.router.navigateByUrl('/slots');
        console.log('response data: '+JSON.stringify(data['responseData']));
        this.chargingPortsList=data['responseData'];
        console.log('charging slots: '+JSON.stringify(this.chargingPortsList));

        
        for (let index = 0; index < this.chargingPortsList.length; index++) {
          var obj = this.chargingPortsList[index];
          console.log('charging slot id: '+obj);
      
        }

      } 
    });
 }
  }

}
