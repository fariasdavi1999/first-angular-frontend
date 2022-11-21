import { ClienteService } from './../../cliente/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { TarefaService } from 'src/app/tarefa/tarefa.service';

import { Cliente } from './../../cliente/cliente';
import { Tarefa } from './../tarefa';


@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class TarefaComponent implements OnInit {

  tarefa: Tarefa = new Tarefa;

  tarefas: Tarefa[] = new Array<Tarefa>();

  clientes: Cliente[] = new Array<Cliente>;

  titulo: string = 'Cadastrar Tarefa';

  constructor(
    private tarefaService: TarefaService,
    private clienteService: ClienteService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {

    const id: any = this.route.snapshot.params['id'];

    if (id) {
      this.titulo = 'Editar Tarefa';
      this.getTarefa(id);
    }

    this.getClientes();

  }

  getClientes() {
    this.clienteService.listarTodos().subscribe(
      (response) => {
        this.clientes = [...response]
      }
    )
  }

  getTarefas() {
    this.tarefaService.listarTarefas().subscribe(
      (response) => {
        this.tarefas = [...response]
      }
    )
  }

  getTarefa(id: any) {
    this.tarefaService.getById(id).subscribe(
      (response) => {
        this.tarefa = { ...response }
      }
    )
  }


  getIsEditando() {
    return Boolean(this.tarefa.id)
  }

  salvar() {

    this.confirmationService.confirm({
      message: 'Deseja realmente salvar essa tarefa?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if (this.getIsEditando()) {
          this.getAlterar()
        } else {
          this.getIncluir()
        }

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

  getIncluir() {
    this.tarefaService.getIncluir(this.tarefa).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'Tarefa incluida com sucesso!' })
        setTimeout(() => {
          this.router.navigate(['/tarefa'])
        }, 1500);
      }, (erro) => {
        console.log(erro);
      }
    )
  }

  getAlterar() {

    this.tarefaService.getAlterarTarefa(this.tarefa.id, this.tarefa).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'Tarefa alterada com sucesso!' });
        setTimeout(() => {
          this.router.navigate(['/tarefa']).then(
            () => window.location.reload()
          )
        }, 1400);
      }, (erro) => {
        console.log(erro);
      }
    )
  }


}
