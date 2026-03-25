import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/cliente/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  urlApiClientes = '';

  private idUsuario: string | undefined;

  constructor(private readonly http: HttpClient) {
    this.urlApiClientes = `${environment.urlApi}/clientes`;
  }

  getByCpf(cpfCliente: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlApiClientes}/cpf/${cpfCliente}`);
  }

  setIdUsuario(id: string): void {
    this.idUsuario = id;
  }

  logout(): void {
    this.idUsuario = undefined;
  }

  usuarioEstaAutenticado(): boolean {
    return this.idUsuario !== undefined;
  }
}
