import { EditerMotPasseComponent } from './editer-mot-passe/editer-mot-passe.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { MedecinComponent } from "./medecin/medecin.component";
import{AccessDeniedComponent} from "./access-denied/access-denied.component";
import{ServiceComponentComponent} from "./service-component/service-component.component";
import{SpecialiteComponent} from "./specialite/specialite.component"
import { UpdateComponent } from "./update/update.component";
import { BlogComponent } from "./blog/blog.component";
import {  RendezVousComponent} from "./rendez-vous/rendez-vous.component";
import {  ValiderRenderVousComponent} from "./valider-render-vous/valider-render-vous.component";
import { PostComponent } from "./post/post.component";
import { HopitalComponent } from "./hopital/hopital.component";

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'admin',component:AdminComponent},
  {path:'medecin',component:MedecinComponent},
  {path:'access-denied',component:AccessDeniedComponent},
  {path:'specialite-medecin',component:SpecialiteComponent},
  {path:'service-specialite',component:ServiceComponentComponent},
  {path:'update-medecin',component:UpdateComponent},
  {path:'register-blog',component:BlogComponent},
  {path:'rendez-vous',component:RendezVousComponent},
  {path:'valider-rendez-vous',component:ValiderRenderVousComponent},
  {path:'editer-profil',component:EditerMotPasseComponent},
  {path:'post',component:PostComponent},
  {path:'blog',component:BlogComponent},
  {path:'hopital',component:HopitalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
