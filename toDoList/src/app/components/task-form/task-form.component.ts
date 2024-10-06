import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  protected taskForm: WritableSignal<FormGroup> = signal(new FormGroup({}));

  @Output() $taskAdded = new EventEmitter<string>();

  constructor(private readonly fb: FormBuilder) {
    this.createForm();
  }

  public createForm(): void {
    this.taskForm.set(this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
    }));
  }

  public addTask(): void {
    this.$taskAdded.emit(this.taskForm().value.task);
    this.taskForm().reset();
  }
}
