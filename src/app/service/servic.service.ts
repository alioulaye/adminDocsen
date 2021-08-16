import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
export interface  service{
  id?:number,
 libelle?:String
 
}

@Injectable({
  providedIn: 'root'
})
export class ServicService {

  private API_SERVER = "http://localhost:8080";
  
  constructor(private router:Router, private http:HttpClient) { }

  getAll(params){

    return this.http.get<[]>(this.API_SERVER + "/hopital/service/all", { params });
  }

  getListe(){

    return this.http.get(this.API_SERVER + "/hopital/service/all");
  }

  getOneSpe(id){
    return this.http.get(this.API_SERVER+"/hopital/service/"+id)
  }

  add(data:any){

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER + "/hopital/service/add",JSON.stringify(data),httpOptions)
  }
}
