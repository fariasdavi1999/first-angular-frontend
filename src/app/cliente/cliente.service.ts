import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly api = '/assets/clientes.json'

  constructor(private http: HttpClient) { }

  getCliente() {

    return this.http.get<Cliente[]>(this.api);

  }
}