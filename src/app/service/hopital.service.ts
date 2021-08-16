import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";

export interface  hopital{
  id?:number,
  nom?:String,
  tel?:String,
  adresse?:String
}

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  private API_SERVER = "http://localhost:8080";
 

  constructor(private router:Router, private http:HttpClient) { }

  getAllH(params){

    return this.http.get<[]>(this.API_SERVER + "/hopital/all", { params });
  }

  getAll(){

    return this.http.get(this.API_SERVER + "/hopital/all");
  }

  getone(id){

    return this.http.get(this.API_SERVER + "/hopital/getOneH/"+ id );
  }

  add(data:any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER +"/medecin/hopital",JSON.stringify(data),httpOptions);
  }
}
