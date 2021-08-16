import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthentificationServiceService } from "../service/authentification-service.service";

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.scss']
})
export class MedecinComponent implements OnInit {

  public userName:string;
 nbRdv:any
  userGet:any
  format = 'data:image/jpeg;base64,';
  constructor(private route:Router,private user:AuthentificationServiceService) { 
    this.userName=sessionStorage.getItem('username');
    //this.getUser();
    this.getNbRdv();
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



  getNbRdv(){
    this.user.getNb().subscribe(
      (res) => { 
        console.log(res);
       // this.hopitals = res;
       // console.log(this.hopitals);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
