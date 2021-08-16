import { Component, OnInit } from '@angular/core';
import { AuthentificationServiceService } from "../service/authentification-service.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner"; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profit:any;
  format = 'data:image/jpeg;base64,';

  constructor(private auth : AuthentificationServiceService, private route:Router,private SpinnerService: NgxSpinnerService) { 
    this.profit={
      nom:'',
      prenom:'',
      photo:''
    }
  }

  ngOnInit(): void {
    this.profil();
  }

  logout(){
    this.SpinnerService.show();
    this.auth.logout();
    setTimeout(() => {
      this.route.navigate(['/login']);
      this.SpinnerService.hide();
  }, 8000);
    
   

  }

  profil(){
    this.auth.getAdmin(sessionStorage.getItem("username")).subscribe(
      res=>{
       // this.profit=res;
        this.profit.nom=res.data.nom;
        this.profit.prenom = res.data.prenom
        this.profit.photo=res.data.photo
        console.log(this.profit);
        
      },error=>{
        console.log(error);
        
      }
    )
  }

  /*spe(){
    this.route.navigate([])
  }*/

}
