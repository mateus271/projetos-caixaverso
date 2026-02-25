import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface Ticket {
  id: number,
  nomeUsuario: string;
  problema: string;
}

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public tickets: Ticket[] = [];
  public editandoDemanda = signal<boolean>(false);

  public nomeUsuario = signal("");
  public problema = signal("");
  public demandaEditadaId = signal(0);

  private proximoId = 1;

  public adicionarDemanda(): void {
    this.tickets.push({
      id: this.proximoId++,
      nomeUsuario: this.nomeUsuario(),
      problema: this.problema()
    });

    this.nomeUsuario.set("");
    this.problema.set("");
    this.editandoDemanda.set(false);
  }

  public cancelarEdicao(): void {
    this.nomeUsuario.set("");
    this.problema.set("");
    this.editandoDemanda.set(false);
  }

  public resolverDemanda(id: number): void {
    const indexDemanda = this.tickets.findIndex(demanda => demanda.id === id);
    this.tickets.splice(indexDemanda, 1);
  }

  public editarDemanda(id: number): void {
    const indexDemanda = this.tickets.findIndex(demanda => demanda.id === id);
    this.demandaEditadaId.set(id);
    this.editandoDemanda.set(true);
    this.nomeUsuario.set(this.tickets[indexDemanda].nomeUsuario);
    this.problema.set(this.tickets[indexDemanda].problema);
  }

  public alterarDemanda(id: number): void {
    this.resolverDemanda(id);

    this.tickets.push({
      id: id,
      nomeUsuario: this.nomeUsuario(),
      problema: this.problema()
    });

    this.cancelarEdicao();
  }
}
