import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './componentes/login/auth.service';
import { AuthGuard } from './componentes/login/auth.guard';
import { EmpresaAuthGuard } from './componentes/empresa/empresa-servicos/empresa-auth.guard';
import { EmpresaAuthService } from './componentes/empresa/empresa-servicos/empresa-auth.service';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuarioReadComponent } from './componentes/usuario/usuario-read/usuario-read.component';
import { UsuarioDetailComponent } from './componentes/usuario/usuario-detail/usuario-detail.component';
import { UsuarioCreateComponent } from './componentes/usuario/usuario-create/usuario-create.component';
import { UsuarioUpdateComponent } from './componentes/usuario/usuario-update/usuario-update.component';
import { EmpresaReadComponent } from './componentes/empresa/empresa-read/empresa-read.component';
import { EmpresaDetailComponent } from './componentes/empresa/empresa-detail/empresa-detail.component';
import { EmpresaFormComponent } from './componentes/empresa/empresa-form/empresa-form.component';
import { ClienteReadComponent } from './componentes/cliente/cliente-read/cliente-read.component';
import { FornecedorReadComponent } from './componentes/fornecedor/fornecedor-read/fornecedor-read.component';
import { SetorReadComponent } from './componentes/setor/setor-read/setor-read.component';
import { ControlePontoReadComponent } from './componentes/controle-ponto/controle-ponto-read/controle-ponto-read.component';
import { ProjetoReadComponent } from './componentes/projeto/projeto-read/projeto-read.component';
import { QuadroReadComponent } from './componentes/quadro/quadro-read/quadro-read.component';
import { AtividadeReadComponent } from './componentes/atividade/atividade-read/atividade-read.component';
import { EtapaReadComponent } from './componentes/etapa/etapa-read/etapa-read.component';
import { CalendarioReadComponent } from './componentes/calendario/calendario-read/calendario-read.component';
import { LembreteReadComponent } from './componentes/lembrete/lembrete-read/lembrete-read.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';
import { TableComponent } from './componentes/geral/table/table.component';
import { TableService } from './componentes/geral/table/table.service';
import { DetailComponent } from './componentes/geral/detail/detail.component';
import { DetailService } from './componentes/geral/detail/detail.service';
import { FormComponent } from './componentes/geral/form/form.component';
import { FormService } from './componentes/geral/form/form.service';
import { ValidaCamposService } from './servicos/valida-campos/valida-campos.service';
import { ChartComponent } from './componentes/geral/chart/chart.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    EmpresaDetailComponent,
    EmpresaFormComponent,
    ClienteReadComponent,
    FornecedorReadComponent,
    SetorReadComponent,
    ControlePontoReadComponent,
    ProjetoReadComponent,
    QuadroReadComponent,
    AtividadeReadComponent,
    EtapaReadComponent,
    CalendarioReadComponent,
    LembreteReadComponent,
    Pagina404Component,
    TableComponent,
    DetailComponent,
    FormComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AuthService,
    AuthGuard,
    EmpresaAuthGuard,
    EmpresaAuthService,
    TableService,
    DetailService,
    FormService,
    ValidaCamposService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
