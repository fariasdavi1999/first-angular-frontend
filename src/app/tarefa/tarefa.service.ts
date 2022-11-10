import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private API = 'http://localhost:8080/api/tarefas'

  constructor(private http: HttpClient) { }


}
