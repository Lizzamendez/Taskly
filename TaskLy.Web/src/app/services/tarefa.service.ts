import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Tarefa } from '../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = '/api/tarefas';  // Usa o proxy configurado
  private http = inject(HttpClient);

  // Listar todas as tarefas
  obterTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Buscar tarefa por ID
  obterTarefaPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Criar nova tarefa
  criarTarefa(tarefa: Tarefa): Observable<Tarefa> {
    return this.http.post<Tarefa>(this.apiUrl, tarefa)
      .pipe(catchError(this.handleError));
  }

  // Atualizar tarefa
  atualizarTarefa(id: number, tarefa: Tarefa): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, tarefa)
      .pipe(catchError(this.handleError));
  }

  // Remover tarefa
  excluirTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Gerenciamento centralizado de erros
  private handleError(error: HttpErrorResponse) {
    let mensagem = 'Aconteceu um erro inesperado';
    
    if (error.status === 0) {
      mensagem = 'Não foi possível conectar com o servidor';
    } else if (error.error instanceof ErrorEvent) {
      mensagem = `Erro: ${error.error.message}`;
    } else {
      mensagem = `Código ${error.status}: ${error.error?.message || error.statusText}`;
    }
    
    console.error(mensagem);
    return throwError(() => new Error(mensagem));
  }
}