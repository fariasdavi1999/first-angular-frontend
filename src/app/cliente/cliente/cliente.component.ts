import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';

import { Cliente } from '../cliente';
import { ClienteService } from './../cliente.service';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [MessageService, ConfirmationService]
})

export class ClienteComponent implements OnInit {

  cliente: Cliente = new Cliente;

  clientes: Cliente[] = new Array<Cliente>();

  titulo!: string;

  constructor(
    private clienteService: ClienteService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    const id: any = this.route.snapshot.params['id'];

    if (id) {
      this.getCliente(id)
    }

  }

  getClientes() {
    this.clienteService.listarTodos().subscribe(
      (response) => {
        this.clientes = [...response]
      }
    )
  }

  getCliente(id: any) {
    this.clienteService.getById(id).subscribe(
      (response) => {
        this.cliente = { ...response }
      }
    )
  }


  getIsEditando() {
    return Boolean(this.cliente.id)
  }

  salvar() {

    this.confirmationService.confirm({
      message: 'Deseja realmente salvar esse cliente?',
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


  getAlterar() {


    this.clienteService.getAlterar(this.cliente.id, this.cliente).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Alteração ', detail: 'cliente alterada com sucesso!' });

        setTimeout(() => {
          this.router.navigate(['/cliente'])
        }, 1300);
      }, (erro) => {
        console.log(erro);
      }
    )
  }


  getIncluir() {

    this.clienteService.getIncluir(this.cliente).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'cliente incluida com sucesso!' })
        setTimeout(() => {
          this.router.navigate(['/cliente'])
        }, 1500);
      }, (erro) => {
        console.log(erro);

      }
    )

  }


  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

}