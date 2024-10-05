import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { CommonModule } from '@angular/common';
import { ITask } from '../../shared/interfaces/task.interface';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasksList!: ITask[];
  @Output() $deleteTask = new EventEmitter<string>();
  @Output() $editTask = new EventEmitter<ITask>();
}
