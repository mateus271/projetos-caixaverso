import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './guards/auth.guard';
import { consorcioResolver } from './resolver/consorcio.resolver';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "perfil",
    component: PerfilComponent
  },
  {
    path: "catalogo",
    component: CatalogoComponent
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  }

  // {
  //   path: "",
  //   component: "",
  //   canActivate: [authGuard],
  //   canActivateChild: [authGuard],
  //   // lista é o array de objetos necessários na página
  //   resolve: { lista: consorcioResolver }
  // }
];
