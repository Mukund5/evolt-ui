import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private http: HttpClient,private router:Router) { }

  userDetails;

  ngOnInit() {
    
  
  const headerValues = { 'content-type': 'application/json','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,HEAD,OPTIONS,POST,PUT','Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,x-client-key,x-client-token,x-client-secret,Authorization'} 
    
  this.http.post('http://localhost:8080/evolt/user/getUserDetails',
   { 
    user_id: sessionStorage.getItem('logged_in_user_id')
  },
  {
      headers: headerValues
  })
    .subscribe(data => {
      // handle the data
      console.log('user details data response: '+JSON.stringify(data));

      if(data['responseStatus']!='SUCCESS')
      {
        console.log('Error message: '+JSON.stringify(data['errorMessage']));
        this.showNotification('top','center',data['errorMessage']);
        
      }
      else
      {

        console.log('user final response data: '+JSON.stringify(data['responseData']));
        this.userDetails=data['responseData'];
        
        

      } 
    });
 
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
