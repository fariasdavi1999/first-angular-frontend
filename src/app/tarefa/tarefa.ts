import { Cliente } from './../cliente/cliente';
export class Tarefa {
  id!: number;
  nomeTarefa!: string;
  descricao!: string;
  feito!: false;
  dataCadastro!: string;
  dataConclusao?: string;
  cliente = new Cliente();
}
