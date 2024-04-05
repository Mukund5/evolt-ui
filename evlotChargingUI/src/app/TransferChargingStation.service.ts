import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChargingStationObject } from './chargingStationObject';

@Injectable({
  providedIn: 'root'
})
export class TransferChargingStationService {

  
  constructor(
    private router:Router
    
  ) { }

  private chargingStation:ChargingStationObject;

  setChargingStation(data){
    this.chargingStation = data;
  }

  getChargingStation(){
    let temp = this.chargingStation;
    //this.clearChargingStation();
    return temp;
  }

  clearChargingStation(){
    this.chargingStation = undefined;
  }

}