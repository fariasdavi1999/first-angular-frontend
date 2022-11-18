import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private API = 'http://localhost:8080/api/tarefas'

  constructor(private http: HttpClient) { }

  listarTarefas() {
    return this.http.get<Array<Tarefa>>(`${this.API}/listar-tarefas`);
  }

}
