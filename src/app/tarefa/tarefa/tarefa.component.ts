import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { environment } from 'src/environments/environment';
import { TarefaService } from 'src/app/tarefa/tarefa.service';

import { Cliente } from './../../cliente/cliente';
import { ClienteService } from './../../cliente/cliente.service';
import { Tarefa } from './../tarefa';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
  providers: [MessageService, ConfirmationService],
  standalone: false,
})
export class TarefaComponent implements OnInit {
  tarefa: Tarefa = new Tarefa();

  clientes: Cliente[] = [];

  titulo: string = 'Cadastrar Tarefa';

  constructor(
    private tarefaService: TarefaService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Editar Tarefa';
      this.getTarefa(id);
    }

    this.getClientes();
  }

  getClientes() {
    this.clienteService.listarTodos().subscribe((response) => {
      this.clientes = [...response];
    });
  }

  getTarefa(id: string) {
    this.tarefaService.getById(id).subscribe((response) => {
      this.tarefa = { ...response };
    });
  }

  getIsEditando() {
    return Boolean(this.tarefa.id);
  }

  salvar() {
    this.confirmationService.confirm({
      message: 'Deseja realmente salvar essa tarefa?',
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

  getIncluir() {
    this.tarefaService.getIncluir(this.tarefa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Inclusão',
          detail: 'Tarefa incluída com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/tarefa']), 1500);
      },
      error: (erro) => {
        if (!environment.production) {
          console.error(erro);
        }
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível incluir a tarefa.' });
      },
    });
  }

  getAlterar() {
    this.tarefaService.getAlterarTarefa(this.tarefa.id, this.tarefa).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Alteração',
          detail: 'Tarefa alterada com sucesso!',
        });
        setTimeout(() => this.router.navigate(['/tarefa']), 1400);
      },
      error: (erro) => {
        if (!environment.production) {
          console.error(erro);
        }
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Não foi possível alterar a tarefa.' });
      },
    });
  }
}
