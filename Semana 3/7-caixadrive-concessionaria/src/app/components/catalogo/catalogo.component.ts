import { ActivatedRoute } from '@angular/router';
import { CardCarroComponent } from '../card-carro/card-carro.component';
import { Carro } from './../../interfaces/carro.interface';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-catalogo',
  imports: [
    CardCarroComponent
  ],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent implements OnInit {
  public listaCarros = signal<Carro[]>([]);

  private route = inject(ActivatedRoute);
  private catalogoService = inject(CatalogoService);

  ngOnInit(): void {
    const carrosBuscados = this.route.snapshot.data['listaCarros'];

    this.catalogoService.listaCarros.set(carrosBuscados);

    if (carrosBuscados) {
      this.listaCarros.set(carrosBuscados);
    }
  }
}
