import { Component, inject, OnInit } from '@angular/core';
import { Favoritos } from '../../interfaces/favoritos.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { MatIconModule } from '@angular/material/icon';
import { CardCarroComponent } from '../card-carro/card-carro.component';
import { Carro } from '../../interfaces/carro.interface';

@Component({
  selector: 'app-perfil',
  imports: [
    MatIconModule,
    CardCarroComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent implements OnInit {
  public usuario: Usuario | undefined = undefined;
  public carrosFavoritos: Carro[] = [];

  private usuariosService = inject(UsuariosService);

  ngOnInit(): void {
    this.usuario = this.usuariosService.usuarioLogado();
    const favoritos = this.obterFavoritos();
  }

  obterFavoritos(): Favoritos | null {
    const data = localStorage.getItem('favoritos');

    if (!data) {
      return null;
    }

    console.log("Favoritos", JSON.parse(data) as Favoritos);

    return JSON.parse(data) as Favoritos;
  }
}
