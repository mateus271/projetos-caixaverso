import { Component, input, OnInit } from '@angular/core';
import { Carro } from '../../interfaces/carro.interface';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Favoritos } from '../../interfaces/favoritos.interface';

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

  ngOnInit(): void {

  }

  public reservarCarro(id: number): void {
    console.log("reservar carro", id);
  }

  public salvarFavoritos(favoritos: Favoritos): void {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }
}
