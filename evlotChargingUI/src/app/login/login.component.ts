import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormControl, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{


  loginForm = new FormGroup({
    username: new FormControl(""),
    password: new FormControl("")
  });
  constructor(private router: Router,private loginService: LoginService) {

  }

    
    ngOnInit() {
        console.log("LoginComponent testing");
    }

    onSubmit(event: any) {
      console.log("You clicked the submit button in login page");

      console.log('username value: '+JSON.stringify(this.loginForm.value['username']));
      console.log('password value: '+JSON.stringify(this.loginForm.value['password']));

      this.loginService.postData(this.router,this.loginForm.value['username'],this.loginForm.value['password']);
      
    }

    
}