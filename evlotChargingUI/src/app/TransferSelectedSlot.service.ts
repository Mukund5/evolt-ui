import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChargingSlotObject } from './ChargingSlotObject';


@Injectable({
  providedIn: 'root'
})
export class TransferSelectedSlotService {

  
  constructor(
    private router:Router
    
  ) { }

  private selectedslot:ChargingSlotObject;
  

  setSelectedSlot(data){
    this.selectedslot = data;
  }

  getSelectedSlot(){
    let temp = this.selectedslot;
        return temp;
  }

  clearSelectedSlot(){
    this.selectedslot = undefined;
  }

  

}