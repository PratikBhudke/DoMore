import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { Todo } from './todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  standalone: false
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todoForm: FormGroup;
  editingTodo: Todo | null = null;
  priorities: string[] = ['High', 'Medium', 'Low'];
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private todoService: TodoService,
    private fb: FormBuilder
  ) {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      priority: ['Medium', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.todoService.getAllTodos().subscribe({
      next: (todos) => {
        console.log('Received todos:', todos);
        this.todos = todos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
        this.errorMessage = 'Failed to load todos. Please try again.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const todoData = {
        ...this.todoForm.value,
        completed: false
      };

      console.log('Submitting todo data:', todoData);

      if (this.editingTodo) {
        this.todoService.updateTodo(this.editingTodo.id!, todoData).subscribe({
          next: (updatedTodo) => {
            console.log('Todo updated successfully:', updatedTodo);
            this.loadTodos();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating todo:', error);
            this.errorMessage = 'Failed to update todo. Please try again.';
            this.isLoading = false;
          }
        });
      } else {
        this.todoService.createTodo(todoData).subscribe({
          next: (newTodo) => {
            console.log('Todo created successfully:', newTodo);
            this.loadTodos();
            this.resetForm();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating todo:', error);
            this.errorMessage = 'Failed to create todo. Please try again.';
            this.isLoading = false;
          }
        });
      }
    } else {
      this.markFormGroupTouched(this.todoForm);
    }
  }

  editTodo(todo: Todo): void {
    console.log('Editing todo:', todo);
    this.editingTodo = todo;
    this.todoForm.patchValue({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      dueDate: todo.dueDate
    });
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.isLoading = true;
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          console.log('Todo deleted successfully');
          this.loadTodos();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
          this.errorMessage = 'Failed to delete todo. Please try again.';
          this.isLoading = false;
        }
      });
    }
  }

  toggleTodoStatus(id: number): void {
    this.isLoading = true;
    this.todoService.toggleTodoStatus(id).subscribe({
      next: () => {
        console.log('Todo status toggled successfully');
        this.loadTodos();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error toggling todo status:', error);
        this.errorMessage = 'Failed to update todo status. Please try again.';
        this.isLoading = false;
      }
    });
  }

  resetForm(): void {
    this.todoForm.reset({
      priority: 'Medium'
    });
    this.editingTodo = null;
    this.errorMessage = '';
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
