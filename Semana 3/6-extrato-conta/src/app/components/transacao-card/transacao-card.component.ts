import { Component, input } from '@angular/core';
import { Transacao } from '../../models/transacao.interface';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-transacao-card',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './transacao-card.component.html',
  styleUrls: ['./transacao-card.component.scss']
})
export class TransacaoCardComponent {
  public transacao = input.required<Transacao>();
}
