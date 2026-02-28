import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transacao } from "../models/transacao.interface";

@Injectable({
    providedIn: 'root'
})
export class TransacoesService{
    private http = inject(HttpClient);

    private jsonUrl = "transacoes.json";

    getTransacoes(): Observable<Transacao[]>{
        return this.http.get<Transacao[]>(this.jsonUrl);
    }
}