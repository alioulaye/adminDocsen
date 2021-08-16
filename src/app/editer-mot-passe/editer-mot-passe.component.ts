import { Component, OnInit } from '@angular/core';
import { AuthentificationServiceService } from "../service/authentification-service.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-editer-mot-passe',
  templateUrl: './editer-mot-passe.component.html',
  styleUrls: ['./editer-mot-passe.component.scss']
})
export class EditerMotPasseComponent implements OnInit {
  valide:string
  profit:any
  constructor(private auth : AuthentificationServiceService, private route:Router,private SpinnerService: NgxSpinnerService) {
    this.profit={
      username:'',
      passWrd:'',
      password:'',
      idUser:0
    }
    this.profil()
   }

  ngOnInit(): void {
    
  }

  
  modif(){
    console.log(this.profit.newPwd)
    console.log(this.profit.username)
    console.log(this.profit. password)
    this.profit.idUser=localStorage.getItem("id")
    console.log(localStorage.getItem("id")+" "+this.profit.idUser)
    this.auth.editProfil(this.profit).subscribe(
      res=>{
        console.log(res);
       if (res.body.status=='ok'){
        this.SpinnerService.show();
        this.auth.logout();
        setTimeout(() => {
          this.route.navigate(['/login']);
          this.SpinnerService.hide();
      }, 8000);
       }else{
          this.valide="le mot de passe incorrect "
       }

        
      },error=>{
        console.log(error);
        
      }
    )
  }

  profil(){
    this.auth.getAdmin(sessionStorage.getItem("username")).subscribe(

      res=>{
        this.profit=res;
        this.profit.username=res.data.username;
        localStorage.setItem("id",res.data.idUser)
        console.log(this.profit.username + " "+localStorage.getItem("id"));
        
      },error=>{
        console.log(error);
        
      }
    )
  }

}
