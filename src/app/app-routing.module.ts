import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './componentes/login/auth.guard';
import { EmpresaAuthGuard } from './componentes/empresa/empresa-servicos/empresa-auth.guard';

// Importando Componentes
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
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
import { ControlePontoReadComponent } from './componentes/controle-ponto/controle-ponto-read/controle-ponto-read.component';
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
import { CalendarioReadComponent } from './componentes/calendario/calendario-read/calendario-read.component';
import { LembreteReadComponent } from './componentes/lembrete/lembrete-read/lembrete-read.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';

// Definindo Rotas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  
  { path: 'usuario/read', component: UsuarioReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'usuario/read/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard] },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: 'usuario/update/:id', component: UsuarioUpdateComponent, canActivate: [AuthGuard] },
  
  { path: 'empresa/read', component: EmpresaReadComponent, canActivate: [AuthGuard] },
  { path: 'empresa/read/:id', component: EmpresaDetailComponent, canActivate: [AuthGuard] },
  { path: 'empresa/create', component: EmpresaFormComponent, canActivate: [AuthGuard] },
  { path: 'empresa/update/:id', component: EmpresaFormComponent, canActivate: [AuthGuard] },
  
  { path: 'cliente/read', component: ClienteReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'cliente/read/:id', component: ClienteDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'cliente/create', component: ClienteFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'cliente/update/:id', component: ClienteFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'fornecedor/read', component: FornecedorReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'fornecedor/read/:id', component: FornecedorDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'fornecedor/create', component: FornecedorFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'fornecedor/update/:id', component: FornecedorFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'setor/read', component: SetorReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'setor/read/:id', component: SetorDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'setor/create', component: SetorFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'setor/update/:id', component: SetorFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'controle-ponto/read', component: ControlePontoReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/read/:id', component: ControlePontoDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/create', component: ControlePontoCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/update/:id', component: ControlePontoUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'projeto/read', component: ProjetoReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'projeto/read/:id', component: ProjetoDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'projeto/create', component: ProjetoFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'projeto/update/:id', component: ProjetoFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'quadro/read', component: QuadroReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'quadro/read/:id', component: QuadroDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'quadro/create', component: QuadroFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'quadro/update/:id', component: QuadroFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'atividade/read', component: AtividadeReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'atividade/read/:id', component: AtividadeDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'atividade/create', component: AtividadeFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'atividade/update/:id', component: AtividadeFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'etapa/read', component: EtapaReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'etapa/read/:id', component: EtapaDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'etapa/create', component: EtapaFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  { path: 'etapa/update/:id', component: EtapaFormComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'calendario/read', component: CalendarioReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'calendario/read/:id', component: CalendarioDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'calendario/create', component: CalendarioCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'calendario/update/:id', component: CalendarioUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  { path: 'lembrete/read', component: LembreteReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'lembrete/read/:id', component: LembreteDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'lembrete/create', component: LembreteCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'lembrete/update/:id', component: LembreteUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  
  { path: '**', component: Pagina404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
