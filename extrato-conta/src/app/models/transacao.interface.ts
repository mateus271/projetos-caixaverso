export interface Transacao {
    id: number,
    tipo: "ENTRADA" | "SAIDA",
    valor: number,
    descricao: string,
    data: string
}