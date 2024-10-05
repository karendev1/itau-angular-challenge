import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ITask } from '../../shared/interfaces/task.interface';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { IActions } from '../../shared/interfaces/actions.interface';
import { EModalDataDelete } from '../../shared/enums/modal.enum';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TaskModalComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() taskItem!: ITask;
  @Output() $deleteTask = new EventEmitter<void>();
  @Output() $editTask = new EventEmitter<ITask>();

  protected taskItemForm!: FormGroup;
  protected titleModal!: string;
  protected subtitleModal!: string;
  protected actionsModal!: IActions;
  protected showModal = false;
  protected hasEditItem = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.createForm();
  }

  public createForm(): void {
    this.taskItemForm = this.fb.group({
      selectedTaskItem: ['', [Validators.required, Validators.minLength(3)]],
      taskItem: [null],
    });
  }

  public handleDeleteModal(): void {
    this.titleModal = EModalDataDelete.TITLE_DELETE;
    this.subtitleModal = EModalDataDelete.SUBTITLE_DELETE;
    this.actionsModal = {
      primary: {
        label: EModalDataDelete.LABEL_PRIMARY,
        callback: () => this.$deleteTask.emit(),
      },
      secondary: {
        label: EModalDataDelete.LABEL_SECONDARY,
        callback: () => this.handleShowModal(),
      },
    };
    this.showModal = true;
  }

  public handleShowModal(): void {
    this.showModal = !this.showModal;
  }

  public handleEditItem(): void {
    this.hasEditItem = !this.hasEditItem;
    this.cdr.detectChanges();
    const input = document.getElementById(this.taskItem.id) as HTMLInputElement;
    if (input && this.hasEditItem) {
      input.focus();
      this.taskItemForm.get('taskItem')?.setValue(this.taskItem.name)
    }
  }

  public confirmEditItem(taskItem: ITask): void {
    if (!this.taskItemForm.value.taskItem) {
      return;
    }
    const newTask: ITask = {
      id: taskItem.id,
      date: new Date(),
      name: this.taskItemForm.value.taskItem,
      isCompleted: false,
    };
    this.$editTask.emit(newTask);
  }
}
