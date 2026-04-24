import { Component, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Tarefa } from '../../models/tarefa.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tarefa-formulario',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tarefa-formulario.html',
  styleUrls: ['./tarefa-formulario.css']
})
export class TarefaFormularioComponent implements OnInit, OnDestroy {
  private tarefaService = inject(TarefaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // Subject para cancelar subscriptions manualmente em métodos de evento
  private destroy$ = new Subject<void>();

  tarefa: Tarefa = {
    titulo: '',
    descricao: '',
    status: 'Pendente'
  };

  isEditMode = false;
  salvando = false;
  mensagem = '';
  tipoMensagem: 'success' | 'error' = 'success';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      // takeUntilDestroyed é seguro aqui pois está no contexto de inicialização
      this.tarefaService.obterTarefaPorId(+id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => this.tarefa = data,
          error: () => {
            this.exibirMensagem('Tarefa não encontrada', 'error');
            setTimeout(() => this.router.navigate(['/tarefas']), 2000);
          }
        });
    }
  }

  ngOnDestroy(): void {
    // Cancela todas as subscriptions abertas em métodos de evento
    this.destroy$.next();
    this.destroy$.complete();
  }

  salvar(): void {
    if (!this.tarefa.titulo.trim() || this.salvando) {
      this.exibirMensagem('O título é obrigatório', 'error');
      return;
    }

    this.salvando = true;
    const operacao: Observable<Tarefa | void> = this.isEditMode
      ? this.tarefaService.atualizarTarefa(this.tarefa.id!, this.tarefa)
      : this.tarefaService.criarTarefa(this.tarefa);

    // Usa takeUntil com destroy$ para subscriptions fora do contexto de injeção
    operacao.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.salvando = false; // FIX: resetar salvando no caminho de sucesso
        this.exibirMensagem(
          this.isEditMode ? 'Tarefa atualizada' : 'Tarefa criada',
          'success'
        );
        setTimeout(() => this.router.navigate(['/tarefas']), 1500);
      },
      error: (err: any) => {
        this.salvando = false;
        let errorMessage = 'Erro ao salvar a tarefa.';
        if (err instanceof HttpErrorResponse) {
          errorMessage = err.error?.message || err.message || errorMessage;
        } else if (err.message) {
          errorMessage = err.message;
        }
        this.exibirMensagem(errorMessage, 'error');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/tarefas']);
  }

  private exibirMensagem(texto: string, tipo: 'success' | 'error'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 3000);
  }
}