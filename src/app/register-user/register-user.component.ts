import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SpecialiteService } from "../service/specialite.service";
import { HopitalService } from "../service/hopital.service";
import { hopital } from "../service/hopital.service";
import { Ispecialite } from "../service/specialite.service";
import { MedecinAddService } from "../service/medecin-add.service";


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  specialites:any
  hopitals:any
  medecin:any
  format = 'data:image/jpeg;base64,';
  ImageBaseData:any
  private spe : Ispecialite
  private hop:hopital
  select='';
  selectH=''

  constructor( private medec:MedecinAddService,private specialite:SpecialiteService,private hopitalS:HopitalService) { 
    this.medecin={username: '',
    password: '',
    email: '',
    photo: '',
    nom: '',
    prenom: '',
    dateNaiss: '',
    idHopital : 0,
    tel: '',
    adresse: '',
    idSpecialite: 0,
    image: '',
    registerAt: '',}
  }

  
  hopitalSave = 0;
  specialiteSave = 0;

  ngOnInit(): void {
    this.getAll();
    this.getAllH();
  }
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

  getAllH(){
    this.hopitalS.getAll().subscribe(
      (res)=>{
        this.select='selectionner un specialite'
        console.log(res);
        
       this.hopitals=res;
      },
      (er)=>{
        console.log(er);
        
      }
    );
  }

  getAll(){
    this.specialite.getAllSpe().subscribe(
      (res)=>{
        this.selectH='selectionner un hopital'
        console.log(res);
        
       this.specialites=res;
      },
      (er)=>{
        console.log(er);
        
      }
    );
  }

  handleFileInput(files: FileList) {
    let me = this;
    let file = files[0];
    let reader = new FileReader();
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
    let today = new Date();
      let dd = String(today. getDate()). padStart(2, '0');
      let mm = String(today. getMonth() + 1). padStart(2, '0'); //January is 0!
      let yyyy = today. getFullYear();
      this.medecin.registerAt = dd+'/'+mm+'/'+yyyy;
      this.ImageBaseData=this.ImageBaseData.split(',')[1];
      this.medecin.image=this.ImageBaseData.toString();
     this.medecin.idHopital=this.hopitalSave;
     this.medecin.idSpecialite=this.specialiteSave;
      console.log(this.medecin);
      if(this.ImageBaseData==null){
        alert("Please select file");
      }
 
     this.medec.add(this.medecin).subscribe(
        (res)=>{
          console.log(res);
          
        },(err)=>{
          console.log(err);
          
        }
      )
  }

  AllMedecin(){

  }

}
