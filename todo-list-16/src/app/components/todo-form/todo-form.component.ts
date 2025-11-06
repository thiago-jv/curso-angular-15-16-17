import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  templateUrl: './todo-form.component.html',
  styleUrls: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class TodoFormComponent {

  // Serviços injetados
  private readonly todosSignalsService = inject(TodoSignalsService);
  private readonly dialogRefService = inject(MatDialogRef<HeaderComponent>);

  // Lista de todos observável via signals
  public allTodos = this.todosSignalsService.todoState();

  // Formulário com validações
  public todosForm = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl<string>('', [Validators.required, Validators.minLength(5)])
  });

  // Criação de novo todo
  handleCreateNewTodo(): void {
    if (this.todosForm.invalid) return;

    const { title, description } = this.todosForm.value;

    this.todosSignalsService.updateTodos({
      id: this.allTodos.length + 1,
      title: title ?? '',
      description: description ?? '',
      done: false
    });

    this.dialogRefService.close();
  }

  // Fechar modal
  public handleCloseModal(): void {
    this.dialogRefService.close();
  }
}
