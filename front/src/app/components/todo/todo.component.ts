import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { NgClass, NgIf } from '@angular/common';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
export interface Task {
  id: number;
  task: string;
  description: string;
  complete: boolean;
}

export interface Response {
  statusCode: number;
  data: Task[];
  message: string;
  success: boolean;
}

@Component({
  selector: 'app-todo',
  imports: [NgClass, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  private readonly todoService = inject(TodoService);
  public tasks: Task[] = [];
  public formGroup!: FormGroup;
  public isModalOpen: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      task: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      complete: new FormControl(false, [Validators.required]),
    });
    this.getAll();
  }

  getAll() {
    this.todoService.getAll().subscribe({
      next: (res: Response) => {
        this.tasks = res.data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getOne(id: number) {
    this.todoService.getOne(+id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  createOne() {
    if (!this.formGroup.valid) {
      alert('Formulario incompleto');
      return;
    }
    this.todoService.createTask(this.formGroup.value).subscribe({
      next: (res) => {
        this.closeModal();
        this.getAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  taskCompleted(item: Task) {
    item.complete = true;
    this.todoService.completeTask(item).subscribe({
      next: (res) => {
        this.getAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteTask(id: number) {
    this.todoService.delete(+id).subscribe({
      next: (res) => {
        this.getAll();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
