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
  { path: 'empresa/read', component: EmpresaReadComponent, canActivate: [AuthGuard] },
  { path: 'usuario/create', component: UsuarioCreateComponent },
  { path: '**', component: Pagina404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
