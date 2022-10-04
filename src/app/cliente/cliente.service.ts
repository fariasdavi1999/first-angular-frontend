import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  getClienteSmall() {
    return this.http.get<any>('assets/clientes.json')
      .toPromise()
      .then(res => <Cliente[]>res.data)
      .then(data => { return data; });
  }

}
