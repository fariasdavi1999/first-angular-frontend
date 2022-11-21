import { Cliente } from './../cliente/cliente';
export class Tarefa {
    id!: number;
    nomeTarefa!: string;
    descricao!: string;
    feito!: boolean;
    dataCadastro!: string;
    dataConclusao?: string;
    cliente = new Array<Cliente>();
}
