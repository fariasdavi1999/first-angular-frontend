import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cliente/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlApiClientes = '';

  constructor(private router: Router, private http: HttpClient) {
    this.urlApiClientes = `${environment.urlApi}/clientes`;
  }

  getByCpf(cpfCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlApiClientes}/cpf/${cpfCliente}`);
  }
}
