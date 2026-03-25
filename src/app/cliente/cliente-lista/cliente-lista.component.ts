import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from 'src/environments/environment';

import { Cliente } from './../cliente';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css'],
  standalone: false,
})
export class ClienteListaComponent implements OnInit {
  loading: boolean = false;

  totalDeRegistros: number = 0;

  clientes: Cliente[] = [];

  clientesLazyLoad: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.getTodosClientes();
  }

  getTodosClientes() {
    this.clienteService.listarTodos().subscribe((response) => {
      this.clientes = [...response];
      this.clientesLazyLoad = [...response];
      this.totalDeRegistros = response.length;
    });
  }

  deletar(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esse cliente?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteService.getExcluir(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Excluído',
              detail: 'Cliente excluído com sucesso.',
            });
            this.getTodosClientes();
          },
          error: (erro) => {
            if (!environment.production) {
              console.error(erro);
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir o cliente.',
            });
          },
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejeitado',
              detail: 'Você rejeitou a operação.',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelado',
              detail: 'Você cancelou a operação.',
            });
            break;
        }
      },
    });
  }

  loadCustomers(event: TableLazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.clientesLazyLoad.length) {
        const numPrimeiraLinha = Number(event.first);
        const numLinhasPagina = numPrimeiraLinha + Number(event.rows);
        this.clientes = [...this.clientesLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];
      }
      this.loading = false;
    }, 500);
  }
}
