import { Component, OnInit } from '@angular/core';
import { RendezVousService } from "../service/rendez-vous.service";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner"; 
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent implements OnInit {

  format = 'data:image/jpeg;base64,';
  rdv:any
  id:0
  currentIndex = -1;
  username:any
  page = 1;
  count : any;
  pageSize = 3;
  pageSizes = [3, 6, 9];
 
  constructor(
    private rv:RendezVousService,private route:Router,private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAllRv()
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
    this.getAllRv();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllRv();
  }

  

  getAllRv(){
    const params = this.getRequestParams(this.username, this.page, this.pageSize);
    this.rv.getAllRv(params).subscribe(
      res=>{
        this.count=res.length;
        this.rdv=res
        console.log(this.rdv);
        
      },error=>{
        console.log(error);
        
      }
    )
  }

  valider(id){
    localStorage.setItem("idRv",id);
    console.log(localStorage.getItem("idRv"))
    this.route.navigate(['valider-rendez-vous'])
  }
}
