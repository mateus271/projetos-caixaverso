import { inject, Injectable, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetectarRotaService {
    public rotaAtual = signal("");

    private router = inject(Router);

    public detectarRota() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.rotaAtual.set(this.router.url);
      }
    );
  }
}