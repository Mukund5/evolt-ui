import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleDetailsObject } from 'app/vehicleDetailsObj';
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  //imports:[],
//  standalone: true
})
export class VehiclesComponent implements OnInit {

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

  ngOnInit() {
    this.listUserVehicles();
    this.tableData1 = {
      headerRow: [ 'Vehicle ID', 'Registration Number', 'Brand Name', 'Model Name', 'Model Number','Battery Capacity'],
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

  vehicleDetailsList:VehicleDetailsObject[];

  brandChange(brandName)
  {
    console.log('Brand: '+brandName);
    if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
      {
        const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/vehicle/getModelsList', { 
        vehicle_type: 'all',
        brand_name:brandName
      },
      {
          headers: headerValues
      })
        .subscribe(data => {
          // handle the data
          console.log('models response: '+JSON.stringify(data));
  
          if(data['responseStatus']!='SUCCESS')
          {
            console.log('Error message: '+JSON.stringify(data['errorMessage']));
            this.showNotification('top','center',data['errorMessage']);
            this.showModelsSection=false;
            this.modelList=[];
          }
          else
          {
            console.log('response data: '+JSON.stringify(data['responseData']));
            
            this.showModelsSection=true;

            this.modelList=data['responseData'];
            // for (let index = 0; index < data['responseData'].length; index++) {
            //   var obj = data['responseData'][index];
            //   console.log('Model name val: '+obj.modelName);
            //   this.modelList.push(obj.modelName);
              
            // }
            console.log('model details: '+JSON.stringify(this.modelList));
          } 
        });
      }
      else 
      {
        //this.showNotification('top','center','No valid session found');
      }
  }

  registerVehicle()
  {

    //sessionStorage.getItem('logged_in_user_id')
    if(!this.isValidString(this.selectedVehicleId.toString()))
    {
      this.showNotification('top','center','Please select a Vehicle model');
    }
    else if(!this.isValidString(this.vehicleForm.value['registration']))
    {
      this.showNotification('top','center','Please enter Registration number');
    }
    else
    {
      
      const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/vehicle/registerNewVehicle', 
      {
         user_id: sessionStorage.getItem('logged_in_user_id'),
         vehicle_id:this.selectedVehicleId.toString(),
         registration_number:this.vehicleForm.value['registration']
    },
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
            this.showNotification('top','center','Vehicle Registered successfully');
            this.cancelRegistration();
          } 
        });
      
    }
  }

  cancelRegistration()
  {
    this.showAddVehicleSection=false;
    this.brandList=[];
  
    this.showModelsSection=false;
    this.modelList=[];
    this.selectedVehicleId='';
    this.vehicleForm.reset();
    this.listUserVehicles();
  }

  modelChange(model)
  {
    console.log('model: '+JSON.stringify(model));
    this.selectedVehicleId='';
    for (let index = 0; index < this.modelList.length; index++) {
      var obj = this.modelList[index];
      if(obj.modelName===model)
      {
        console.log('vehicle match id: '+obj.vehicleId);
        this.selectedVehicleId=obj.vehicleId;
      }
    }
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

  listUserVehicles()
  {
    
      console.log("Entered listUserVehicles");
  
      if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
      {
        const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/vehicle/listRegisteredVehicles', { user_id: sessionStorage.getItem('logged_in_user_id')},
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
            this.vehicleDetailsList=data['responseData'];
            console.log('vehicle details: '+JSON.stringify(this.vehicleDetailsList));

            for (let index = 0; index < this.vehicleDetailsList.length; index++) {
              var obj = this.vehicleDetailsList[index];
              console.log('vehicle detail id: '+obj.vehicleDetailId);
              
            }

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

  showAddVehicle()
  {
    this.showAddVehicleSection=true;

    //Calling the API to get the brands list
    if(this.isValidString(sessionStorage.getItem('logged_in_user_id')))
      {
        const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/vehicle/getBrandsList', {vehicle_type: 'all'},
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
            this.brandList=data['responseData'];
            console.log('brand list details: '+JSON.stringify(this.brandList));

            

          } 
        });
      }
      else 
      {
        //this.showNotification('top','center','No valid session found');
      }



  }

}
