import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './componentes/login/auth.service';
import { AuthGuard } from './componentes/login/auth.guard';
import { EmpresaAuthGuard } from './componentes/empresa/empresa-servicos/empresa-auth.guard';
import { EmpresaAuthService } from './componentes/empresa/empresa-servicos/empresa-auth.service';
import { ValidaCamposService } from './servicos/valida-campos/valida-campos.service';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioReadComponent } from './componentes/usuario/usuario-read/usuario-read.component';
import { UsuarioDetailComponent } from './componentes/usuario/usuario-detail/usuario-detail.component';
import { UsuarioCreateComponent } from './componentes/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './componentes/usuario/usuario-update/usuario-update.component';
import { EmpresaReadComponent } from './componentes/empresa/empresa-read/empresa-read.component';
import { ClienteReadComponent } from './componentes/cliente/cliente-read/cliente-read.component';
import { FornecedorReadComponent } from './componentes/fornecedor/fornecedor-read/fornecedor-read.component';
import { ControlePontoReadComponent } from './componentes/controle-ponto/controle-ponto-read/controle-ponto-read.component';
import { ProjetoReadComponent } from './componentes/projeto/projeto-read/projeto-read.component';
import { AtividadeReadComponent } from './componentes/atividade/atividade-read/atividade-read.component';
import { QuadroReadComponent } from './componentes/quadro/quadro-read/quadro-read.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuarioReadComponent,
    UsuarioDetailComponent,
    UsuarioCreateComponent,
    UsuarioUpdateComponent,
    EmpresaReadComponent,
    ClienteReadComponent,
    FornecedorReadComponent,
    ControlePontoReadComponent,
    ProjetoReadComponent,
    AtividadeReadComponent,
    QuadroReadComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, EmpresaAuthGuard, EmpresaAuthService, ValidaCamposService],
  bootstrap: [AppComponent]
})
export class AppModule { }
