import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private API_SERVER = "http://localhost:8080";
  constructor(private router:Router, private http:HttpClient) { }

  getAll( params ){
    return this.http.get<[]>(this.API_SERVER+"/api/post/all",{ params });
  }

  AddPost(data:any){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'}) };
    return this.http.post<any>(this.API_SERVER + "/api/post/add",data,{observe:'response'})
  }

  getOnePost(id){
    return this.http.get(this.API_SERVER+"/api/post/post/"+id);
  }
}
