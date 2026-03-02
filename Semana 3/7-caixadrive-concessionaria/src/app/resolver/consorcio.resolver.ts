import { inject } from "@angular/core";
import { ResolveFn } from "@angular/router";
import { CatalogoService } from "../services/catalogo.service";
import { Carro } from "../interfaces/carro.interface";

export const consorcioResolver: ResolveFn<Carro[]> = () => {
  const catalogoService = inject(CatalogoService);

  return catalogoService.getCarros();
}
