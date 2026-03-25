import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { environment } from 'src/environments/environment';

import { Cliente } from '../cliente';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [MessageService, ConfirmationService],
  standalone: false,
})
export class ClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();

  titulo: string = 'Cadastrar Cliente';

  constructor(
    private readonly clienteService: ClienteService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Alterar Cliente';
      this.getCliente(id);
    }
  }

  getCliente(id: string) {
    this.clienteService.getById(id).subscribe({
      next: (response) => {
        this.cliente = { ...response };
      },
      error: (erro) => {
        if (!environment.production) {
          console.error(erro);
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível carregar o cliente.',
        });
      },
    });
  }

  getIsEditando() {
    return Boolean(this.cliente.id);
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse cliente?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.getIsEditando()) {
          this.getAlterar();
        } else {
          this.getIncluir();
        }
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

  getAlterar() {
    this.clienteService.getAlterar(this.cliente.id, this.cliente).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Alteração',
          detail: 'Cliente alterado com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/cliente']), 1300);
      },
      error: (erro) => {
        if (!environment.production) {
          console.error(erro);
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível alterar o cliente.',
        });
      },
    });
  }

  getIncluir() {
    this.clienteService.getIncluir(this.cliente).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Inclusão',
          detail: 'Cliente incluído com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/cliente']), 1500);
      },
      error: (erro) => {
        if (!environment.production) {
          console.error(erro);
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível incluir o cliente.',
        });
      },
    });
  }
}
