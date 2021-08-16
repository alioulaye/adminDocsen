import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HopitalService } from "../service/hopital.service";
import { hopital } from "../service/hopital.service";
import { ServicService } from "../service/servic.service";
import { service } from "../service/servic.service";
import { MedecinAddService } from "../service/medecin-add.service";
import { DocteurModel } from "../service/medecin-add.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showModal = false;
  searchTerm: string ;
  filterItem:any;
  getTable=false;
  medecin:{
    id:0,
    username: '',
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
  hopitals:any
  items:{ id : number;
    nom: string;
    prenom?: string;
    photo?: string;
    specialite?: string;
    hopital?: string;
    adresse: string;
    username: string;
   tel: string;}
  services:service[]
  doctor:any
  format = 'data:image/jpeg;base64,';
  currentIndex = -1;
  username:any
  page = 1;
  count : any;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  prenom:''
 
  constructor(private route:Router,private hopitalAll:HopitalService, private service:ServicService,private medecinListe:MedecinAddService)
   { this.loadAll();
    this.allMedecin();
    
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

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`prenom`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  handlePageChange(event): void {
    this.page = event;
    this.allMedecin();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.allMedecin();
  }

  loadAll() {

   
    this.hopitalAll.getAll().subscribe(
      (res) => {
        
        this.hopitals = res;
        console.log(this.hopitals);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  allMedecin():void{
    const params = this.getRequestParams(this.prenom, this.page, this.pageSize);
    console.log(this.prenom
      +this.page+this.pageSize);
    
      this.medecinListe.getAll(params ).subscribe(
        (res)=>{
          
          this.count=res.length;
          this.doctor=res;
          console.log(this.doctor);
          
        },(err)=>{
          console.log(err)
        }
      )
  }

 
  editer(medecin){

    
    localStorage.setItem("username", medecin.id)
    localStorage.setItem("bool","true");
    console.log("bonjour l'identifiant"+localStorage.getItem("username")+" est "+ localStorage.getItem("bool"));
   this.route.navigate(['update-medecin'])
  }



}
