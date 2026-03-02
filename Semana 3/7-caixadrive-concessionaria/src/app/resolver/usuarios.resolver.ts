import { ResolveFn } from "@angular/router";
import { Usuario } from "../interfaces/usuario.interface";
import { UsuariosService } from "../services/usuarios.service";
import { inject } from "@angular/core";

export const usuariosResolver: ResolveFn<Usuario[]> = () => {
  const usuariosService = inject(UsuariosService);

  return usuariosService.getUsuarios();
}
