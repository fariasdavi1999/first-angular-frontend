import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tarefa } from './tarefa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  urlApiTarefas = '';

  constructor(private http: HttpClient) {
    this.urlApiTarefas = `${environment.urlApi}/tarefas`;
  }

  listarTarefas() {
    return this.http.get<Array<Tarefa>>(`${this.urlApiTarefas}/listar-tarefas`);
  }

  getById(id: any): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.urlApiTarefas}/${id}`);
  }

  getByFeito(feito: boolean) {
    return this.http.get<Tarefa>(`${this.urlApiTarefas}/feito/${feito}`);
  }

  getAlterarTarefa(id: any, request: Tarefa) {
    return this.http.put<Tarefa>(`${this.urlApiTarefas}/${id}`, request);
  }

  getIncluir(request: Tarefa) {
    return this.http.post<Tarefa>(this.urlApiTarefas, request);
  }

  getExcluir(id: any) {
    return this.http.delete<Tarefa>(`${this.urlApiTarefas}/${id}`);
  }
}
