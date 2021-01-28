import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { ClienteDetailComponent } from './componentes/cliente/cliente-detail/cliente-detail.component';
import { ClienteFormComponent } from './componentes/cliente/cliente-form/cliente-form.component';
import { FornecedorReadComponent } from './componentes/fornecedor/fornecedor-read/fornecedor-read.component';
import { FornecedorDetailComponent } from './componentes/fornecedor/fornecedor-detail/fornecedor-detail.component';
import { FornecedorFormComponent } from './componentes/fornecedor/fornecedor-form/fornecedor-form.component';
import { SetorReadComponent } from './componentes/setor/setor-read/setor-read.component';
import { SetorDetailComponent } from './componentes/setor/setor-detail/setor-detail.component';
import { SetorFormComponent } from './componentes/setor/setor-form/setor-form.component';
import { ProjetoReadComponent } from './componentes/projeto/projeto-read/projeto-read.component';
import { ProjetoDetailComponent } from './componentes/projeto/projeto-detail/projeto-detail.component';
import { ProjetoFormComponent } from './componentes/projeto/projeto-form/projeto-form.component';
import { QuadroReadComponent } from './componentes/quadro/quadro-read/quadro-read.component';
import { QuadroDetailComponent } from './componentes/quadro/quadro-detail/quadro-detail.component';
import { QuadroFormComponent } from './componentes/quadro/quadro-form/quadro-form.component';
import { AtividadeReadComponent } from './componentes/atividade/atividade-read/atividade-read.component';
import { AtividadeDetailComponent } from './componentes/atividade/atividade-detail/atividade-detail.component';
import { AtividadeFormComponent } from './componentes/atividade/atividade-form/atividade-form.component';
import { EtapaReadComponent } from './componentes/etapa/etapa-read/etapa-read.component';
import { EtapaDetailComponent } from './componentes/etapa/etapa-detail/etapa-detail.component';
import { EtapaFormComponent } from './componentes/etapa/etapa-form/etapa-form.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';
import { TableComponent } from './componentes/geral/table/table.component';
import { DetailComponent } from './componentes/geral/detail/detail.component';
import { FormComponent } from './componentes/geral/form/form.component';
import { ChartComponent } from './componentes/geral/chart/chart.component';
import { ModalComponent } from './componentes/geral/modal/modal.component';
import { HttpService } from './componentes/geral/http/http.service';
import { ValidateService } from './componentes/geral/validate/validate.service';

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
    ClienteDetailComponent,
    ClienteFormComponent,
    FornecedorReadComponent,
    FornecedorDetailComponent,
    FornecedorFormComponent,
    SetorReadComponent,
    SetorDetailComponent,
    SetorFormComponent,
    ProjetoReadComponent,
    ProjetoDetailComponent,
    ProjetoFormComponent,
    QuadroReadComponent,
    QuadroDetailComponent,
    QuadroFormComponent,
    AtividadeReadComponent,
    AtividadeDetailComponent,
    AtividadeFormComponent,
    EtapaReadComponent,
    EtapaDetailComponent,
    EtapaFormComponent,
    Pagina404Component,
    TableComponent,
    DetailComponent,
    FormComponent,
    ChartComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DragDropModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
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
    HttpService,
    ValidateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
