import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { MedecinComponent } from './medecin/medecin.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { TokenInterceptorService } from "./service/token-interceptor.service";
import { HeaderComponent } from './header/header.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HopitalComponent } from './hopital/hopital.component';
import { SpecialiteComponent } from './specialite/specialite.component';
import { ServiceComponentComponent } from './service-component/service-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { UpdateComponent } from './update/update.component';
import { BlogComponent } from './blog/blog.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { ValiderRenderVousComponent } from './valider-render-vous/valider-render-vous.component';
import { EditerMotPasseComponent } from './editer-mot-passe/editer-mot-passe.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    MedecinComponent,
    AccessDeniedComponent,
    HeaderComponent,
    RegisterUserComponent,
    HopitalComponent,
    SpecialiteComponent,
    ServiceComponentComponent,
    UpdateComponent,
    BlogComponent,
    RendezVousComponent,
    ValiderRenderVousComponent,
    EditerMotPasseComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule ,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
