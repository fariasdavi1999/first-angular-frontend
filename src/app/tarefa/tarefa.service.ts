import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tarefa } from './tarefa';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  private API = 'http://localhost:8080/api/tarefas';

  constructor(private http: HttpClient) {}

  listarTarefas() {
    return this.http.get<Array<Tarefa>>(`${this.API}/listar-tarefas`);
  }

  getById(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.API}/${id}`);
  }

  getByFeito(feito: boolean): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.API}/feito/${feito}`);
  }

  // getByFeito(feito: boolean) {
  //   return this.http.get<Array<Tarefa>>(`${this.API}/feito/${feito}`);
  // }

  getAlterarTarefa(id: any, request: Tarefa) {
    return this.http.put<Tarefa>(`${this.API}/${id}`, request);
  }

  getIncluir(request: Tarefa) {
    return this.http.post<Tarefa>(this.API, request);
  }

  getExcluir(id: any) {
    return this.http.delete<Tarefa>(`${this.API}/${id}`);
  }
}
