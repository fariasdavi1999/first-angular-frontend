import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from 'src/environments/environment';

import { Tarefa } from './../tarefa';
import { TarefaService } from './../tarefa.service';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css'],
  providers: [MessageService, ConfirmationService],
  standalone: false,
})
export class TarefaListaComponent implements OnInit {
  loading: boolean = true;

  checked: boolean = false;

  totalDeRegistros: number = 0;

  tarefas: Tarefa[] = [];

  tarefasLazyLoad: Tarefa[] = [];

  constructor(
    private tarefaService: TarefaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const feitoParam: string = this.route.snapshot.params['feito'];
    const feito = feitoParam === 'true';

    if (feitoParam !== undefined) {
      this.getTarefasPorFeito(feito);
    } else {
      this.getTodasTarefas();
    }
  }

  getTodasTarefas() {
    this.tarefaService.listarTarefas().subscribe((response) => {
      this.tarefas = [...response];
      this.tarefasLazyLoad = [...response];
      this.totalDeRegistros = response.length;
    });
  }

  getTarefasPorFeito(feito: boolean) {
    this.tarefaService.getByFeito(feito).subscribe((response) => {
      this.tarefas = Array.isArray(response) ? [...response] : [response];
      this.tarefasLazyLoad = [...this.tarefas];
      this.totalDeRegistros = this.tarefas.length;
    });
  }

  deletar(id: number) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir essa tarefa?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.tarefaService.getExcluir(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Excluído',
              detail: 'Tarefa excluída com sucesso.',
            });
            this.getTodasTarefas();
          },
          error: (erro) => {
            if (!environment.production) {
              console.error(erro);
            }
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Não foi possível excluir a tarefa.',
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
      if (this.tarefasLazyLoad.length) {
        const numPrimeiraLinha = Number(event.first);
        const numLinhasPagina = numPrimeiraLinha + Number(event.rows);
        this.tarefas = [...this.tarefasLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];
      }
      this.loading = false;
    }, 500);
  }
}
