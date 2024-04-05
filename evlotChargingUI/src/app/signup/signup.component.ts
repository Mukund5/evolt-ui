import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{

  signupForm = new FormGroup({
    firstname: new FormControl(""),
	lastname: new FormControl(""),
    password: new FormControl(""),
	email: new FormControl(""),
	license: new FormControl(""),
	phonenumber: new FormControl("")
  });

  constructor(private http: HttpClient,private router:Router) {

  }

    
    ngOnInit() {
        console.log("SignupComponent testing");
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

    singupUser() {
      console.log("Entered singupUser");
  
      if(!this.isValidString(this.signupForm.value['firstname']))
      {
        this.showNotification('top','center','Please enter a valid First name');
      }
      else if (!this.isValidString(this.signupForm.value['lastname']))
      {
        this.showNotification('top','center','Please enter a valid Last name');
      }
      else if (!this.isValidString(this.signupForm.value['password']))
      {
        this.showNotification('top','center','Please enter a valid password');
      }
      else if (!this.isValidString(this.signupForm.value['email']))
      {
        this.showNotification('top','center','Please enter a valid Email ID');
      }
      else if (!this.isValidString(this.signupForm.value['license']))
      {
        this.showNotification('top','center','Please enter a valid License number');
      }
      else if (!this.isValidString(this.signupForm.value['phonenumber'].toString()))
      {
        this.showNotification('top','center','Please enter a valid Phone number');
      }
      else
      {
      const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
  
      this.http.post('http://localhost:8080/evolt/user/signupUser', { 
        email_id: this.signupForm.value['email'],
        password: this.signupForm.value['password'] ,
        first_name: this.signupForm.value['firstname'] ,
        last_name: this.signupForm.value['lastname'] ,
        driving_license: this.signupForm.value['license'] ,
        phone_number: this.signupForm.value['phonenumber'].toString() ,
        user_type: 'Customer' 
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
            
            this.router.navigateByUrl('/login');
            this.showNotification('top','center','Signup is successful. Kindly login with your credentials');
  
            
  
          }
  
        });
      }
    }
    
    
}