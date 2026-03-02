import { ActivatedRoute } from '@angular/router';
import { CardCarroComponent } from '../card-carro/card-carro.component';
import { Carro } from './../../interfaces/carro.interface';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  imports: [
    CardCarroComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit {
  private route = inject(ActivatedRoute);

  listaCarros = signal<Carro[]>([]);

  ngOnInit(): void {
    const carrosBuscados = this.route.snapshot.data['listaCarros'];

    if (carrosBuscados) {
      this.listaCarros.set(carrosBuscados);
    }
  }
}
