import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';
import { consorcioResolver } from './resolver/consorcio.resolver';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { usuariosResolver } from './resolver/usuarios.resolver';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    resolve: {
      listaUsuarios: usuariosResolver
    }
  },
  {
    path: "perfil",
    component: PerfilComponent,
    canActivate: [authGuard]
  },
  {
    path: "catalogo",
    component: CatalogoComponent,
    canActivate: [authGuard],
    resolve: {
      listaCarros: consorcioResolver
    }
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }
];
