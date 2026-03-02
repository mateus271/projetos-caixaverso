import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const logado = localStorage.getItem("logado") === "true";

  const role = localStorage.getItem("role");

  if (!logado) {
    return router.parseUrl("/login");
  }

  return true;
}
