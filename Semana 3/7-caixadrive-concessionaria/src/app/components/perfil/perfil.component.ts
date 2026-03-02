import { Component, OnInit } from '@angular/core';
import { Favoritos } from '../../interfaces/favoritos.interface';

@Component({
  selector: 'app-perfil',
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  private favoritos: Favoritos[] | null = [];

  ngOnInit(): void {
    // this.favoritos = this.obterFavoritos();
  }

  obterFavoritos(): Favoritos | null {
    const data = localStorage.getItem('favoritos');

    if (!data) {
      return null;
    }

    return JSON.parse(data) as Favoritos;
  }
}
