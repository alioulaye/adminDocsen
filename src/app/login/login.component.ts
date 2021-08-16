import { Component, OnInit } from '@angular/core';
import {AuthentificationServiceService} from "../service/authentification-service.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner"; 
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   user:any
  message:string

  constructor(private auth:AuthentificationServiceService,private route:Router,private SpinnerService: NgxSpinnerService) { 
    this.user={username:'',
               password:''} 
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('authorities'));
    if(sessionStorage.getItem('authorities') === 'ROLE_ADMIN')
      {this.route.navigate(['admin']);console.log("if"+sessionStorage.getItem('authorities'));}
      if(sessionStorage.getItem('authorities') === 'ROLE_MEDECIN')
      {this.route.navigate(['medecin']);console.log("elesif"+sessionStorage.getItem('authorities'));}
      if(sessionStorage.getItem('authorities') != 'ROLE_ADMIN' && sessionStorage.getItem('authorities') != 'ROLE_MEDECIN')
      {this.route.navigate(['login']);console.log("eles"+sessionStorage.getItem('authorities'));}
  }

  checkLogin() {
    console.log("entre de dans");
   /// this.SpinnerService.show();
    this.auth.authentification(this.user)
    .subscribe(res => {
      console.log(res);
      if(res.body.status!=='error'){
        
        if(res.body.data.authorities[0].authority === 'ROLE_ADMIN'){
          this.SpinnerService.show();
              this.auth.logout();
              setTimeout(() => {
                this.auth.saveToken(res.body.data);
                this.route.navigate(['admin']);
                this.SpinnerService.hide();
            }, 5000);
          
            // this.SpinnerService.hide();
        }
      }
        //console.log(res.body.data.authorities[0].authority);
        
        else{
          console.log("blabla"+res.body.data);
          
          if (res.body.data.error === 'INVALID_USERNAME'){
            console.log(this.message);
            
            this.message = 'Utilisateur inexistant';
          }
          else if (res.body.data.error === 'BAD_CREDENTIALS'){
            console.log(this.message);
            this.message = 'Mot de passe incorrect';
          }
        }
    
      console.log("blabla"+res.body.data);

    },
    err => {
      console.log(err);
    });

  }

}
