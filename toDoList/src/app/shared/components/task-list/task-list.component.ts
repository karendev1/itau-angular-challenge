import { Component, Input, OnInit } from '@angular/core';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../../core/services/task.service';
import { ITask } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  @Input() tasksList!: ITask[];
}
