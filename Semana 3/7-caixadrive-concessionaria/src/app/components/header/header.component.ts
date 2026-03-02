import { inject, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public router = inject(Router);
  public rotaAtual: string = "";

  ngOnInit() {
    this.detectarRota();
  }

  private detectarRota() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rotaAtual = this.router.url;
      });
  }

  public navigate(route: string): void {
    this.router.navigate([route]);
  }
}
