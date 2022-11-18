import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';

import { Tarefa } from './../tarefa';
import { TarefaService } from './../tarefa.service';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.css']
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


  getAlterar() {

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
