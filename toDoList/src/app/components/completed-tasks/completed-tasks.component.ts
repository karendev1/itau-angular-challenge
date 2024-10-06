import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../shared/interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
  @Input() tasksListCompleted!: ITask[];
  @Output() $editTask = new EventEmitter<ITask>();
}
