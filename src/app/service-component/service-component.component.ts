import { Component, OnInit } from '@angular/core';
import { ServicService } from "../service/servic.service";
//import { service } from "../service/servic.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner"; 
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.scss']
})
export class ServiceComponentComponent implements OnInit {

  service:any
  serv:any
  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  libelle = '';
  getTable=false;
  page = 1;
  count : any;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  update=false

  constructor(private router:Router, private services:ServicService,private SpinnerService: NgxSpinnerService,private toast:ToastrService) 
  {
    this.All(); 
     this.serv={id:0,libelle:''}
     this.service={id:0,libelle:''}
    }

  ngOnInit(): void {
    
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

  editer(id){
    console.log("bonjoutr"+ id)
    this.services.getOneSpe(id).subscribe(
      res=>{
        this.update=true
        console.log(res);
        
        this.serv=res
      },error=>{
        console.log(error);
        
      }
    )
  }

  All(){
    const params = this.getRequestParams(this.libelle, this.page, this.pageSize);
   this.services.getAll(params).subscribe(
     (res)=>{
      
       
          this.count = res.length;
      this.service=res;
     },
     (er)=>{
       console.log(er);
       
     }
   );
  }
  cleaar(){
    this.serv.libelle='';
  
  }

  addService(){
    console.log(this.serv);
    
    if(this.serv.id!=0){
      console.log('magui feu di verifier avce id');

      this.services.add(this.serv).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.cleaar();
            this.update=false
            this.toast.success('Mise à jour reussie','Succes')
          }else{
            this.toast.error('Echec du Mise à jour ','Erreur')
          }
          this.All()
         
        },(err)=>{console.log(err);
        }
      )
    }else{
      console.log('magui feu di verifier');
      
      this.services.add(this.serv).subscribe(
        (res)=>{
          console.log(res);
          if(res){
            this.toast.success('Insertion reussie','Succes')
          }else{
            this.toast.error('Echec de l\'insertion ','Erreur')
          }
          this.All()
         
        },(err)=>{console.log(err);
        }
      )
    }
   
  }

  handlePageChange(event): void {
    this.page = event;
    this.All();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.All();
  }

}
