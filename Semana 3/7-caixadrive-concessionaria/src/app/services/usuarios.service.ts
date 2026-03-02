import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../interfaces/carro.interface';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuarioLogado = signal<Usuario | undefined>(undefined);

  private http = inject(HttpClient);

  private jsonUrl = "usuarios.json";

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.jsonUrl);
  }
}
