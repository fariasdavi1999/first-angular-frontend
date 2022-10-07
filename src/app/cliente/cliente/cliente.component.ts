import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

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

  constructor(
    private clienteService: ClienteService,

    private messageService: MessageService,
    private confirmationService: ConfirmationService,

    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {



  }

  getUsuario(id: number) {
    this.clienteService.getById(id).subscribe(
      (response) => {
        this.cliente = { ...response }
      }
    )
  }

  getIncluir() {

    this.clienteService.getIncluir(this.cliente).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Inclusão ', detail: 'cliente incluida com sucesso!' })
        setTimeout(() => {
          this.router.navigate(['/cliente'])
        }, 1000);
      }, (erro) => {
        console.log(erro);

      }
    )

  }

}