import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './componentes/login/auth.guard';

// Importando Componentes
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { EmpresaReadComponent } from './componentes/empresa/empresa-read/empresa-read.component';
import { UsuarioCreateComponent } from './componentes/usuario/usuario-create/usuario-create.component';

// Definindo Rotas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'empresa/read', component: EmpresaReadComponent, canActivate: [AuthGuard] },
  { path: 'usuario/create', component: UsuarioCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
