import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../interfaces/carro.interface';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
  private http = inject(HttpClient);

  private jsonUrl = "estoque.json";

  public getCarros(): Observable<Carro[]>{
    return this.http.get<Carro[]>(this.jsonUrl);
  }
}
