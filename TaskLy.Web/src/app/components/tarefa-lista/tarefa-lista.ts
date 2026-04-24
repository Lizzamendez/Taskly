import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TarefaService } from '../../services/tarefa.service';
import { Tarefa } from '../../models/tarefa.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tarefa-lista.html',
  styleUrls: ['./tarefa-lista.css']
})
export class TarefaListaComponent implements OnInit, OnDestroy {
  private tarefaService = inject(TarefaService);
  private destroy$ = new Subject<void>();

  tarefas: Tarefa[] = [];
  loading = true;
  error = '';
  mensagem = '';
  tipoMensagem: 'success' | 'error' = 'success';
  idConfirmandoExclusao: number | null = null;

  ngOnInit(): void {
    this.carregarTarefas();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  carregarTarefas(): void {
    this.loading = true;
    this.error = '';

    // FIX: nombre correcto del servicio: obterTarefas()
    this.tarefaService.obterTarefas()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.tarefas = data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.message || 'Erro ao carregar tarefas';
          this.loading = false;
        }
      });
  }

  confirmarExclusao(id: number): void {
    // FIX: reemplazar confirm() nativo por flag en el template
    this.idConfirmandoExclusao = id;
  }

  cancelarExclusao(): void {
    this.idConfirmandoExclusao = null;
  }

  eliminarTarefa(id: number): void {
    this.idConfirmandoExclusao = null;

    // FIX: nombre correcto del servicio: excluirTarefa()
    this.tarefaService.excluirTarefa(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.tarefas = this.tarefas.filter(t => t.id !== id);
          this.exibirMensagem('Tarefa excluída com sucesso', 'success');
        },
        error: (err) => {
          this.exibirMensagem(`Erro: ${err.message}`, 'error');
        }
      });
  }

  // FIX: manejar todos los posibles estados del modelo
  getStatusClass(status: string): string {
    const statusMap: Record<string, string> = {
      'Concluída': 'status-concluida',
      'Pendente': 'status-pendente',
      'Em andamento': 'status-em-andamento'
    };
    return statusMap[status] ?? 'status-pendente';
  }

  private exibirMensagem(texto: string, tipo: 'success' | 'error'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 3000);
  }
}