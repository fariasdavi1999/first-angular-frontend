import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';

import { Tarefa } from './../tarefa';
import { TarefaService } from './../tarefa.service';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TarefaListaComponent implements OnInit {

  loading: boolean = true;

  checked: boolean = false;

  totalDeRegistros: number = 0

  tarefas: Tarefa[] = [];

  tarefasLazyLoad: Tarefa[] = new Array<Tarefa>();

  tarefa: Tarefa = new Tarefa;

  constructor(

    private tarefaService: TarefaService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,


  ) { }

  ngOnInit(): void {


    this.getTodasTarefas();


  }

  getTodasTarefas() {
    this.tarefaService.listarTarefas().subscribe(
      (response) => {
        this.tarefas = [...response]
        this.tarefasLazyLoad = [...response]
        this.totalDeRegistros = response.length
      }
    )
  }




  deletar(id: any) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir esse cliente?',
      header: 'DELETAR',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Você confirmou a operação.' });
        this.tarefaService.getExcluir(id)
          .subscribe()

        setTimeout(() => {
          return window.location.reload();
        }, 1500);


      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'error', summary: 'Rejeitado', detail: 'Você rejeitou a operação.' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Você cancelou a operação.' });
            break;
        }
      }
    });
  }

  getExcluir(id: any) {
    this.tarefaService.getExcluir(id).subscribe(
      (response) => {
        this.tarefa = { ...response }
      }
    )
  }

  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.tarefas) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.tarefas = [...this.tarefasLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 500);

  }

}
