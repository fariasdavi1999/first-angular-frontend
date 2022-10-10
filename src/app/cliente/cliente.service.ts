import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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