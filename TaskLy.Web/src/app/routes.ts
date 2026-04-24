import { Routes } from '@angular/router';
import { TarefaListaComponent } from './components/tarefa-lista/tarefa-lista';
import { TarefaFormularioComponent } from './components/tarefa-formulario/tarefa-formulario';

export const routes: Routes = [
  { path: '', redirectTo: '/tarefas', pathMatch: 'full' },
  { path: 'tarefas', component: TarefaListaComponent },
  { path: 'tarefas/nova', component: TarefaFormularioComponent },
  { path: 'tarefas/editar/:id', component: TarefaFormularioComponent },
  { path: '**', redirectTo: '/tarefas' }
];