import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SpecialiteService } from "../service/specialite.service";
import { HopitalService } from "../service/hopital.service";
import { hopital } from "../service/hopital.service";
import { Ispecialite } from "../service/specialite.service";
import { MedecinAddService } from "../service/medecin-add.service";
import { AuthentificationServiceService } from "../service/authentification-service.service";
import { ThisReceiver } from '@angular/compiler';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  specialites:any
  hopitals:any
  medecin:any
  format = 'data:image/jpeg;base64,';
  ImageBaseData:any
  private spe : Ispecialite
  private hop:hopital
  hopitalSave:any
  specialiteSave:any
  dateC="| date";
  doc=null;


  constructor(private specialite:SpecialiteService,private route:Router,private hopitalS:HopitalService,private user:AuthentificationServiceService,
    private medec:MedecinAddService,private toast:ToastrService) {
    this.medecin={
      idMedecin:0,
      user:{id:0,email: '',
            image: '',
            username:''
      },
      nom: '',
      prenom: '',
      datenaissance: 0,
      dateNaiss:'',
      username:'',
      email:'',
      idUser:0,
      hopital :{ id:0,nom:''},
      idHopital:'',
      tel: '',
      adresse: '',
      specialite:{id:0,libelle:''},
      idSpecialite: '',
      image: '',
    }


  }


  ngOnInit(): void {
   // console.log("bienvenue dans la partie mise a joure");

   this.getAllH();
    this.getAll();
    this.getUser()
  }





  getUser(){



    this.user.getMedecin(localStorage.getItem("username"))
    .subscribe(res => {
      this.medecin=res;
      console.log(res);

      console.log(this.medecin.user.image+ " "+ this.medecin.datenaissance+ this.dateC);
      localStorage.setItem("bool","false");
      this.medecin.idMedecin=localStorage.getItem("username")
     console.log( localStorage.getItem("bool")+localStorage.getItem("username")+" l'identifier supprimer est :")


    },err => {
      console.log(err);

    });

  }


  updateMedecin(){
    this.medecin.username=this.medecin.user.username;
    this.medecin.dateNaiss = this.medecin.datenaissance
    this.medecin.email = this.medecin.user.email
    this.medecin.idUser = this.medecin.user.id
    this.medecin.image = this.medecin.user.image
    console.log(this.medecin.image);

    this.medec.update(this.medecin).subscribe(
      res=>{
        console.log(res);
        if(res.body.status==='oki'){
          this.toast.success('Mise à jour reussit','Succes')
          this.route.navigate(['/admin'])
        }else{
          this.toast.error('Mise à jour echoue','Erreur')
        }

      },(err)=>{
        console.log(err);

      }
    )

  }
  getAllH(){
    this.hopitalS.getAll().subscribe(
      (res)=>{
        console.log(res);

       this.hopitals=res;
      },
      (er)=>{
        console.log(er);

      }
    );
  }

  afficher=false;
  handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
    this.afficher=true;
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      me.ImageBaseData=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

  addMedecin(){

  }

  getAll(){
    this.specialite.getAllSpe().subscribe(
      (res)=>{
        console.log(res);

       this.specialites=res;
      },
      (er)=>{
        console.log(er);

      }
    );
  }

}
