import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  //imports:[],
//  standalone: true
})
export class AboutComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }
  
  ngOnInit() {
  }




}
