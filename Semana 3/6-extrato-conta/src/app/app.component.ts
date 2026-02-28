import { Component, OnInit, signal } from '@angular/core';
import { TransacoesService } from './service/transacoes.service';
import { Transacao } from './models/transacao.interface';
import { TransacaoCardComponent } from './components/transacao-card/transacao-card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CurrencyPipe,
    TransacaoCardComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public transacoes: Transacao[] = [];
  public saldo: number = 0;
  public tipoSelecionado: "TUDO" | "ENTRADA" | "SAIDA" = "TUDO";

  private todasTransacoes: Transacao[] = [];

  public estaCarregando = signal<boolean>(true);

  constructor(private transacoesService: TransacoesService) {}

  ngOnInit(): void {
    this.transacoesService.getTransacoes().subscribe(transacoes => {
      this.todasTransacoes = this.transacoes = transacoes;

      this.obterSaldo(transacoes);

      this.estaCarregando.set(false);
    });
  }

  public alterarSelecao(tipo: "TUDO" | "ENTRADA" | "SAIDA"): void {
    this.tipoSelecionado = tipo;
    this.estaCarregando.set(true);

    if (tipo === "TUDO") {
      this.transacoes = this.todasTransacoes;
    } else {
      this.transacoes = this.todasTransacoes.filter(transacao => transacao.tipo === tipo)
    }

    this.estaCarregando.set(false);
  }

  private obterSaldo(transacoes: Transacao[]): void {
    let saldo = 0;
    transacoes.forEach(transacao => {
      if (transacao.tipo === "ENTRADA") {
        saldo += transacao.valor; 
      } else {
        saldo -= transacao.valor;
      }
    });

    this.saldo = saldo;
  }
}
