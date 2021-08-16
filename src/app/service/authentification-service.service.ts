import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationServiceService {

  private auth : boolean;
  private API_SERVER = "http://localhost:8080";
  public onlineUser:String;
  constructor(private httpClient:HttpClient, private route:Router) { }
  
  authentification(user: any){
    return this.httpClient.post<any>(this.API_SERVER + "/login", user, {observe:'response'})
  }

  getAdmin(username){
    return this.httpClient.get<any>(this.API_SERVER+"/getAdmin/"+username)

  }

  editProfil(admin:any){
    return this.httpClient.post<any>(this.API_SERVER+"/admin/adminEdite",admin,{observe:'response'})
  }


  saveToken(jwt){
    sessionStorage.setItem('token', jwt.accessToken)
    sessionStorage.setItem('authorities', jwt.authorities[0].authority)
    sessionStorage.setItem('username', jwt.username)
    console.log("saveeeeeeeeeee"+jwt.username)
  }

  logout()
  {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authorities');
    sessionStorage.removeItem('username');
    console.log("supprimmerrrrrrrrrrrrr")
  }

  getNb(){
    return this.httpClient.get(this.API_SERVER+"/medecin/nombreRv");
  }

  getMedecin(userName: string){
    return this.httpClient.get<any>(this.API_SERVER + '/medecin/medecin/'+userName);
  }

  requestUser(userName: string){
    return this.httpClient.get<any>(this.API_SERVER+ '/getUtilisateur/'+userName,{observe:'response'});
  }
 
}
