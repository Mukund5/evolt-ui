import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var $:any;

@Injectable({
    providedIn: 'root'
  })

  

export class LoginService {
  constructor(private http: HttpClient) {}

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


  postData(router,userName,password) {
    console.log("Entered postData");

    if(!this.isValidString(userName))
    {
      this.showNotification('top','center','Please enter a valid username');
    }
    else if (!this.isValidString(password))
    {
      this.showNotification('top','center','Please enter a valid password');
    }
    else
    {
    const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 

    this.http.post('http://localhost:8080/evolt/user/validateLogin', { email_id: userName,password: password },
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
          console.log('first name: '+JSON.stringify(data['responseData']['firstName']));
          router.navigate(['/heroes', { id: '1' }]);
          this.showNotification('top','center','Logged in successfully. Welcome '+data['responseData']['firstName']);

          //Removing any existing session storage and setting the logged in user id
          sessionStorage.removeItem("logged_in_user_id");
          sessionStorage.setItem('logged_in_user_id', data['responseData']['userId']);
          console.log('User id set to : '+sessionStorage.getItem('logged_in_user_id'));

        }

      });
    }
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

}