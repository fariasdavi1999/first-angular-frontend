import { RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Cliente } from './../cliente';
import { ClienteService } from './../cliente.service';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {



  cliente!: Cliente[];

  cols!: any[];


  constructor(private clienteService: ClienteService) {

    this.clienteService.getCliente().subscribe(cliente => this.cliente = cliente);

  }


  ngOnInit() {


    this.cols = [

      { field: 'name', header: 'name' },
      { field: 'cpf', header: 'cpf' },
      { field: 'genero', header: 'genero' },
      { field: 'dataNasc', header: 'dataNasc' }

    ]


  }
}