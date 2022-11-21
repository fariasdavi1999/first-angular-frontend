import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ConfirmationService, ConfirmEventType, LazyLoadEvent, MessageService } from 'primeng/api';

import { Cliente } from './../cliente';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {


  loading: boolean = true;

  totalDeRegistros: number = 0

  clientes: Cliente[] = new Array<Cliente>();

  clientesLazyLoad: Cliente[] = new Array<Cliente>()

  cliente: Cliente = new Cliente;

  cols!: any[];

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';


  constructor(

    private clienteService: ClienteService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,


  ) { }


  ngOnInit() {


    this.cols = [

      { field: 'nome', header: 'nome' },
      { field: 'cpf', header: 'cpf' },
      { field: 'genero', header: 'genero' },
      { field: 'dataNasc', header: 'dataNasc' }

    ]


    this.getTodosClientes();

  }

  getTodosClientes() {
    this.clienteService.listarTodos().subscribe(
      (response) => {
        this.clientes = [...response]
        this.clientesLazyLoad = [...response]
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
        this.clienteService.getExcluir(id)
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
    this.clienteService.getExcluir(id).subscribe(
      (response) => {
        this.cliente = { ...response }
      }
    )
  }



  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.clientes) {

        let numPrimeiraLinha: number = Number(event.first)
        let numLinhasPagina: number = (numPrimeiraLinha + Number(event.rows))
        this.clientes = [...this.clientesLazyLoad.slice(numPrimeiraLinha, numLinhasPagina)];

        this.loading = false;
      }
    }, 500);

  }





}