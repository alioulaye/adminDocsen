import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  private API_SERVER = "http://localhost:8080";

  constructor(private router:Router, private http:HttpClient) { }

  getAllRv(params)
  {
    return this.http.get<[]>(this.API_SERVER+"/hopital/allRdv",{ params })
  }

  getOne(id){
    return this.http.get<any>(this.API_SERVER+"/hopital/getDetailRdv/"+id)
  }
validerRdv(data:any){
  return this.http.post<any>(this.API_SERVER + "/hopital/validerdv", data, {observe:'response'})
}

}
