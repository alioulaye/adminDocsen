import { Component, OnInit } from '@angular/core';
import { ServicService } from "../service/servic.service";
import { ToastrService } from "ngx-toastr";

import { Router } from "@angular/router";
import { SpecialiteService } from "../service/specialite.service";
import { service } from "../service/servic.service";


@Component({
  selector: 'app-specialite',
  templateUrl: './specialite.component.html',
  styleUrls: ['./specialite.component.scss']
})
export class SpecialiteComponent implements OnInit {

  update=false;
 specialites:any
 services:any
 selectedService:any
spec:any
tutorials: any;
currentTutorial = null;
currentIndex = -1;
libelle = '';
getTable=false;
page = 1;
count : any;
pageSize = 3;
pageSizes = [3, 6, 9];

  constructor(private router:Router, private service:ServicService,private specialite:SpecialiteService,private toast:ToastrService)
   {

    this.spec={id:0,libelle:'',service:{id:0,libelle:'Selectionner service'}} 
  }

  ngOnInit(): void {
    this.getAll();this.getListe();
  }

  getRequestParams(searchTitle, page, pageSize): any {
    // tslint:disable-next-line:prefer-const
    let params = {};

    if (searchTitle) {
      params[`libelle`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  getAll(){

    const params = this.getRequestParams(this.libelle, this.page, this.pageSize);
    this.specialite.getAll(params).subscribe(
      (res)=>{
        console.log(res);
        this.count=res.length
       this.specialites=res;
      },
      (er)=>{
        console.log(er);
        
      }
    );
  }
  editer(id){
    console.log("bonjoutr"+ id)
    this.specialite.getOneSpe(id).subscribe(
      res=>{
        this.update=true
        console.log(res);
        
        this.spec=res
      },error=>{
        console.log(error);
        
      }
    )
  }

  editerSpe(){
    
  }

  supprimer(id){
    console.log("bonjoutr"+ id)
  }

   handlePageChange(event): void {
    this.page = event;
    this.getAll();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAll();
  }

  getListe(){
  this.service.getListe().subscribe(
     (res)=>{
       console.log(res);
       
      this.services=res;
     },
     (er)=>{
       console.log(er);
       
     }
   );
  }
  cleaar()
  {
    this.spec.libelle='Selectionner service'
    this.spec.service.libelle=''
    this.spec.service.id=''
  }

  addSpecialite(){

    // this.SpinnerService.show();
    console.log(this.spec)
    if(this.spec.id!=0)
    {
      this.specialite.add(this.spec).subscribe(
        (res)=>{
          if(res){
            this.cleaar();
            this.update=false
            this.toast.success('Mise à jour reussie','Succes')
          }else{
            this.update=false
            this.toast.error('Echec du Mise à jour ','Erreur')
          }
         this.getAll()
          console.log(res);
          
          //  this.SpinnerService.hide();
        },(err)=>{console.log(err);
        }
        )
    }else{
      this.specialite.add(this.spec).subscribe(
        (res)=>{
          if(res){
            this.cleaar();
            this.update=false
            this.toast.success('Insertion reussie','Succes')
          }else{
            this.update=false
            this.toast.error('Echec d\'insertion','Erreur')
          }
         this.getAll()
          console.log(res);
          
          //  this.SpinnerService.hide();
        },(err)=>{console.log(err);
        }
        )
    }
    
  }
}
