import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { service } from "./servic.service";
export interface  Ispecialite{
  id?:number,
  nom?:String,
  service?:service
 
}

@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private API_SERVER = "http://localhost:8080";
  constructor(private router:Router, private http:HttpClient) { }

  getAll(params){

    return this.http.get<[]>(this.API_SERVER + "/hopital/specialite/all", { params });
  }

  getAllSpe(){

    return this.http.get<[]>(this.API_SERVER + "/hopital/specialite/all");
  }

  getOneSpe(id){
    return this.http.get(this.API_SERVER+"/hopital/specialite/"+id)
  }

  add(data:any){

   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER + "/hopital/specialite/add",data,{observe:'response'})
  }
}
