import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetectarRotaService } from '../../services/detectar-rota.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public router = inject(Router);
  private detectarRotaService = inject(DetectarRotaService);
  public rotaAtual = this.detectarRotaService.rotaAtual;

  ngOnInit() {
    this.detectarRotaService.detectarRota();
  }

  public navigate(route: string): void {
    this.router.navigate([route]);
  }
}
