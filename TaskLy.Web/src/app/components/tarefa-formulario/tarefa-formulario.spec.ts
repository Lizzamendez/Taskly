import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefaFormularioComponent } from './tarefa-formulario';

describe('TarefaFormularioComponent', () => {
  let component: TarefaFormularioComponent;
  let fixture: ComponentFixture<TarefaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarefaFormularioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TarefaFormularioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
