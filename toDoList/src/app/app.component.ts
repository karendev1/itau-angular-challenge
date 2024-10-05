import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ITask } from './shared/interfaces/task.interface';
import { TaskService } from './core/services/task.service';
import { v4 as uuidv4 } from 'uuid';
import { Observable, throwError } from 'rxjs';

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
  protected loading = false;
  protected error = false;

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.getItemsList();
  }

  public getItemsList(): void {
    this.handleRequest(this.taskService.getTasks(), (response) => {
      this.tasksList = response;
      console.log(this.tasksList);
    });
  }

  public addTask(task: string): void {
    const body: ITask = {
      id: uuidv4(),
      name: task,
      isCompleted: false,
      date: new Date(),
    };
    this.handleRequest(this.taskService.createTask(body), () => {
      this.getItemsList();
    });
  }

  public deleteTask(id: string): void {
    this.handleRequest(this.taskService.deleteTask(id), () => {
      this.getItemsList();
    });
  }

  public editTask(task: ITask): void {
    this.handleRequest(this.taskService.updateTask(task.id, task), () => {
      this.getItemsList();
    });
  }

  private handleRequest<T>(
    request: Observable<T>,
    onSuccess: (response: T) => void
  ): void {
    this.loading = true;
    this.error = false;

    request.subscribe({
      next: (response) => {
        onSuccess(response);
      },
      error: (error) => {
        this.error = true;
        throwError(() => error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
