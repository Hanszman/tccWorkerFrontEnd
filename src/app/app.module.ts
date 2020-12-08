import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './componentes/login/auth.service';
import { AuthGuard } from './componentes/login/auth.guard';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioCreateComponent } from './componentes/usuario/usuario-create/usuario-create.component';
import { EmpresaReadComponent } from './componentes/empresa/empresa-read/empresa-read.component';
import { Pagina404Component } from './componentes/pagina404/pagina404/pagina404.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioCreateComponent,
    EmpresaReadComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
