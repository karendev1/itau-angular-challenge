import { Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/task';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() taskItem!: ITask;
  protected taskItemForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.createForm();
  }

  public createForm(): void {
    this.taskItemForm = this.fb.group({
      taskItem: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
}
