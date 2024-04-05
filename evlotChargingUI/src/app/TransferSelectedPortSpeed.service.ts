import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChargingPortObject } from './ChargingPortObject';


@Injectable({
  providedIn: 'root'
})
export class TransferSelectedPortSpeedService {

  
  constructor(
    private router:Router
    
  ) { }

  private selectedPort:ChargingPortObject;
  private selectedSpeed:String;

  setSelectedPort(data){
    this.selectedPort = data;
  }

  getSelectedPort(){
    let temp = this.selectedPort;
        return temp;
  }

  clearSelectedPort(){
    this.selectedPort = undefined;
  }

  setSelectedSpeed(data){
    this.selectedSpeed = data;
  }

  getSelectedSpeed(){
    let temp = this.selectedSpeed;
        return temp;
  }

  clearSelectedSpeed(){
    this.selectedSpeed = undefined;
  }

}