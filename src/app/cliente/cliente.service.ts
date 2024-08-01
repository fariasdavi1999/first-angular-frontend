import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Cliente } from './cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  urlApiClientes = '';

  constructor(private http: HttpClient) {
    this.urlApiClientes = `${environment.urlApi}/clientes`;
  }

  listarTodos() {
    return this.http.get<Array<Cliente>>(
      `${this.urlApiClientes}/listar-clientes`
    );
  }

  getByCpf(cpfCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlApiClientes}/cpf/${cpfCliente}`);
  }

  getById(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlApiClientes}/${id}`);
  }

  getIncluir(request: Cliente) {
    return this.http.post<Cliente>(this.urlApiClientes, request);
  }

  getAlterar(id: any, request: Cliente) {
    return this.http.put<Cliente>(`${this.urlApiClientes}/${id}`, request);
  }

  getExcluir(id: any) {
    return this.http.delete<Cliente>(`${this.urlApiClientes}/${id}`);
  }
}
