import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

export interface DocteurModel {
    id : number;
    nom: string;
    prenom?: string;
    photo?: string;
    specialite?: string;
    hopital?: string;
    adresse: string;
    username: string;
   tel: string;
}

@Injectable({
  providedIn: 'root'
})
export class MedecinAddService {

  private API_SERVER = "http://localhost:8080";
  constructor(private router:Router, private http:HttpClient) { }
 
  add(data:any){

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER + "/medecin/registerMedecin",data,{observe:'response'})
  }

  update(data:any){

    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER + "/medecin/updateMedecin",data,{observe:'response'})
  }
  getAll( params ){
    return this.http.get<[]>(this.API_SERVER+"/medecin/all",{ params });
  }

  getNb(){
    return this.http.get(this.API_SERVER+"/medecin/nombreRv");
  }
}
