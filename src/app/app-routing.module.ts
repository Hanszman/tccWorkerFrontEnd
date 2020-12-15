import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './componentes/login/auth.guard';
import { EmpresaAuthGuard } from './componentes/empresa/empresa-servicos/empresa-auth.guard';

// Importando Componentes
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { UsuarioCreateComponent } from './componentes/usuario/usuario-create/usuario-create.component';
import { EmpresaReadComponent } from './componentes/empresa/empresa-read/empresa-read.component';
import { Pagina404Component } from './componentes/pagina404/pagina404.component';

// Definindo Rotas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  
  // { path: 'usuario/read', component: UsuarioReadComponent, canActivate: [AuthGuard] },
  // { path: 'usuario/read/:id', component: UsuarioDetailComponent, canActivate: [AuthGuard] },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  // { path: 'usuario/update/:id', component: UsuarioUpdateComponent, canActivate: [AuthGuard] },
  
  { path: 'empresa/read', component: EmpresaReadComponent, canActivate: [AuthGuard] },
  // { path: 'empresa/read/:id', component: EmpresaDetailComponent, canActivate: [AuthGuard] },
  // { path: 'empresa/create', component: EmpresaCreateComponent, canActivate: [AuthGuard] },
  // { path: 'empresa/update/:id', component: EmpresaUpdateComponent, canActivate: [AuthGuard] },
  
  // { path: 'cliente/read', component: ClienteReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'cliente/read/:id', component: ClienteDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'cliente/create', component: ClienteCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'cliente/update/:id', component: ClienteUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  // { path: 'fornecedor/read', component: FornecedorReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'fornecedor/read/:id', component: FornecedorDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'fornecedor/create', component: FornecedorCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'fornecedor/update/:id', component: FornecedorUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  // { path: 'controle-ponto/read', component: ControlePontoReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/read/:id', component: ControlePontoDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/create', component: ControlePontoCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'controle-ponto/update/:id', component: ControlePontoUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  // { path: 'projeto/read', component: ProjetoReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'projeto/read/:id', component: ProjetoDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'projeto/create', component: ProjetoCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'projeto/update/:id', component: ProjetoUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  // { path: 'atividade/read', component: AtividadeReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'atividade/read/:id', component: AtividadeDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'atividade/create', component: AtividadeCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'atividade/update/:id', component: AtividadeUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },

  // { path: 'sprint/read', component: SprintReadComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'sprint/read/:id', component: SprintDetailComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'sprint/create', component: SprintCreateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  // { path: 'sprint/update/:id', component: SprintUpdateComponent, canActivate: [AuthGuard, EmpresaAuthGuard] },
  
  { path: '**', component: Pagina404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
