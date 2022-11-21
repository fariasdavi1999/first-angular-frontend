import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tarefa } from '../tarefa/tarefa';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API = 'http://localhost:8080/api/clientes'

  constructor(private http: HttpClient) { }

  listarTodos() {

    return this.http.get<Array<Cliente>>(`${this.API}/listar-clientes`);

  }

  getByCpf(cpfCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API}/cpf/${cpfCliente}`)
  }

  getById(id: any): Observable<Cliente> {

    return this.http.get<Cliente>(`${this.API}/${id}`)

  }

  getIncluir(request: Cliente) {

    return this.http.post<Cliente>(this.API, request);

  }

  getAlterar(id: any, request: Cliente) {

    return this.http.put<Cliente>(`${this.API}/${id}`, request);

  }

  getExcluir(id: any) {

    return this.http.delete<Cliente>(`${this.API}/${id}`);

  }

}