import { Component, inject, OnInit } from '@angular/core';
import { Favoritos } from '../../interfaces/favoritos.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuariosService } from '../../services/usuarios.service';
import { CatalogoService } from '../../services/catalogo.service';
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
  private catalogoService = inject(CatalogoService);

  ngOnInit(): void {
    this.usuario = this.usuariosService.usuarioLogado();
    this.carregarFavoritos();
  }

  private carregarFavoritos(): void {
    if (!this.usuario) return;

    const favoritos = this.obterFavoritos();
    const idsFavoritos = new Set(
      favoritos
        .filter(f => f.idCliente === this.usuario!.id)
        .map(f => f.idCarro)
    );

    const todosCarros = this.catalogoService.listaCarros();
    this.carrosFavoritos = todosCarros.filter(c => idsFavoritos.has(c.id));
  }

  private obterFavoritos(): Favoritos[] {
    const data = localStorage.getItem('favoritos');
    return data ? JSON.parse(data) as Favoritos[] : [];
  }
}
