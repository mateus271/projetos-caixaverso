import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Carro } from '../../interfaces/carro.interface';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Favoritos } from '../../interfaces/favoritos.interface';
import { DetectarRotaService } from '../../services/detectar-rota.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-card-carro',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './card-carro.component.html',
  styleUrl: './card-carro.component.scss'
})
export class CardCarroComponent implements OnInit {
  public carro = input.required<Carro>();
  public isFavorito = signal(false);

  private detectarRotaService = inject(DetectarRotaService);
  private usuariosService = inject(UsuariosService);
  public rotaAtual = this.detectarRotaService.rotaAtual;

  ngOnInit() {
    this.detectarRotaService.detectarRota();
    this.verificarFavorito();
  }

  private obterFavoritos(): Favoritos[] {
    const data = localStorage.getItem('favoritos');
    return data ? JSON.parse(data) as Favoritos[] : [];
  }

  private salvarFavoritos(favoritos: Favoritos[]): void {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }

  private verificarFavorito(): void {
    const usuario = this.usuariosService.usuarioLogado();
    if (!usuario) return;

    const favoritos = this.obterFavoritos();
    this.isFavorito.set(
      favoritos.some(f => f.idCliente === usuario.id && f.idCarro === this.carro().id)
    );
  }

  public reservarCarro(id: number): void {
    const usuario = this.usuariosService.usuarioLogado();
    if (!usuario) return;

    let favoritos = this.obterFavoritos();
    const index = favoritos.findIndex(f => f.idCliente === usuario.id && f.idCarro === id);

    if (index >= 0) {
      favoritos.splice(index, 1);
      this.isFavorito.set(false);
    } else {
      favoritos.push({ idCliente: usuario.id, idCarro: id });
      this.isFavorito.set(true);
    }

    this.salvarFavoritos(favoritos);
  }
}
