import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './shared/components/task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './shared/components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ITask } from './shared/interfaces/task';
import { TaskService } from './core/services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    TaskFormComponent,
    TaskListComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [TaskService],
})
export class AppComponent {
  title = 'toDoList';
  protected tasksList: ITask[] = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.getItemsList();
  }

  //TODO: TRATAR ERROS E CRIAR LOADING
  public getItemsList(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasksList = response;
        console.log(this.tasksList);
      },
      error: (error) => {
        console.error('Erro ao carregar as tarefas:', error);
      },
      complete: () => {
        console.log('Requisição de tarefas finalizada');
      },
    });
  }

  //TODO: TRATAR ERROS E CRIAR LOADING
  public addTask(task: string): void {
    const body: ITask = {
      id: this.tasksList.length + 1,
      name: task,
      description: '',
      isCompleted: false,
      date: new Date(),
    };
    this.taskService.createTask(body).subscribe({
      next: () => {
        this.getItemsList();
      },
    });
  }
}
