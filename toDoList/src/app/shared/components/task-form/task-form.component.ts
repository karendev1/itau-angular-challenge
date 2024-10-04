import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  protected taskForm!: FormGroup;
  @Output() $taskAdded = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {
    this.createForm();
  }

  public createForm(): void {
    this.taskForm = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public addTask(): void {
    this.$taskAdded.emit(this.taskForm.value.task);
  }
}
