import { Component, OnInit } from '@angular/core';

import { Cliente } from 'src/app/cliente/cliente';
import { ClienteService } from 'src/app/cliente/cliente.service';

@Component({
  selector: 'app-table-teste',
  templateUrl: './table-teste.component.html',
  styleUrls: ['./table-teste.component.css']
})
export class TableTesteComponent implements OnInit {


  cliente!: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getClienteSmall().then(data => this.cliente = data);
  }

}
