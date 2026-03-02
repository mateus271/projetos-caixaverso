import { Injectable, OnInit } from '@angular/core';
import { Favoritos } from '../interfaces/favoritos.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilService implements OnInit {
  public favoritos: Favoritos[] = [];

  ngOnInit(): void {
    // this.favoritos = localStorage.getItem("favoritos");
  }
}
