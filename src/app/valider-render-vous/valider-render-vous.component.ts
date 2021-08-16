import { RendezVousComponent } from './../rendez-vous/rendez-vous.component';

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner"; 
import { timeout } from 'rxjs/operators';
import { RendezVousService } from "../service/rendez-vous.service";

@Component({
  selector: 'app-valider-render-vous',
  templateUrl: './valider-render-vous.component.html',
  styleUrls: ['./valider-render-vous.component.scss']
})
export class ValiderRenderVousComponent implements OnInit {

rdv:any
 format = 'data:image/jpeg;base64,';
 vali:any
 valide=false

  constructor(private route:Router,private SpinnerService: NgxSpinnerService,private rv:RendezVousService) {
    this.vali={
      id:0,
      idMed:0,
      idPat:0,
       dateRdv:Date
    }
    this.rdv={
      adresse: '',
adressePatient: '',
dateRdv: Date,
etat: '',
hopital: '',
id: 0,
idMed: 0,
idPat: 0,
nommedecin: '',
nompatient: '',
photoMedecin: '',
photoUser:'',
prenommedecin: '',
prenompatient: '',
telMedecin: '',
telPatient: ''
    }
   }

  ngOnInit(): void {
    this.getOneRv()
  }

  getOneRv(){
    console.log(localStorage.getItem("idRv"))
    this.rv.getOne(localStorage.getItem("idRv")).subscribe(
      res=>{
       
          this.rdv=res;
          if(this.rdv.data.etat=='Demande valider'){
            console.log("blablablabla");
            
            this.valide=true
          }
          console.log(this.rdv.data.etat);
          
      },error=>{
console.log(error);

      }
    )
  }
  valider(rdv:any){
    this.vali.id=rdv.id,
    this.vali.idMed=rdv.idMed
    this.vali.dateRdv=rdv.dateRdv
    this.vali.idPat=rdv.idPat
    this.rv.validerRdv(this.vali).subscribe(
      res=>{
        console.log(res);
      },
      error=>{
        console.log(error);
        
      }
    )
    console.log("bonjour le rv"+this.vali.id+ this.vali.idMed +this.vali.dateRdv+this.vali.idPat)
   
  }
}
