import { Component, OnInit } from '@angular/core';
import { HopitalService } from "../service/hopital.service";
import { hopital } from "../service/hopital.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-hopital',
  templateUrl: './hopital.component.html',
  styleUrls: ['./hopital.component.scss']
})
export class HopitalComponent implements OnInit {
  hopitals:any
  hopital:any
  currentTutorial = null;
  currentIndex = -1;
  libelle = '';
  getTable=false;
  page = 1;
  count : any;
  pageSize = 3;
  pageSizes = [3, 6, 9];
  update=false

  constructor(private hopitalAll:HopitalService,private toast:ToastrService) { this.loadAll()
    this.hopital={
      id:0,
      nom:'',
      adresse:'',
      tel:''
    }
  }

  ngOnInit(): void {
  }

   showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
    this.loadAll();
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

  handlePageChange(event): void {
    this.page = event;
    this.loadAll();
  }

 

  editer(id){

    this.hopitalAll.getone(id).subscribe(
      (res)=>{
        console.log(res);
        this.update=true
        this.hopital = res;
        this.loadAll();
        console.log(this.hopital);
        
      },(error)=>{
        console.log(error);
        
      }
    )
  }
  clear(){
    this.hopital.nom='';
    this.hopital.adresse='';
    this.hopital.tel=''
    this.update=false
  }

  addHopital()
  {
    console.log(this.hopital);
    if(this.hopital.id!==0){
      this.hopitalAll.add(this.hopital).subscribe(
        
        (res)=>{
          console.log(res);
          this.loadAll();
          
          this.clear();
        if(res){
            this.toast.success('Mise à jour reussie','Succes')
          }else{
            this.toast.error('Echec du Mise à jour ','Erreur')
          }
          
        },(error)=>{
          console.log(error);
          
        }
      )
    }else{
      this.hopitalAll.add(this.hopital).subscribe(
        
        (res)=>{
          console.log(res);
          this.loadAll();
          this.clear();
        if(res){
            this.toast.success('Insertion reussie','Succes')
          }else{
            this.toast.error('Echec d\'insertion','Erreur')
          }
          
        },(error)=>{
          console.log(error);
          
        }
      )

    }
      
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.loadAll();
  }

  loadAll() {

    const params = this.getRequestParams(this.libelle, this.page, this.pageSize);
    this.hopitalAll.getAllH(params).subscribe(
      (res) => { 
        console.log(res);
        this.count=res.length
        this.hopitals = res;
       // console.log(this.hopitals);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
