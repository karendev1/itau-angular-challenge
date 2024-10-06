import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
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
import { formatDateHelper } from '../../shared/helpers/format-date.helper';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TaskModalComponent],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() showActionsItem: boolean = true;
  @Output() $deleteTask = new EventEmitter<void>();
  @Output() $editTask = new EventEmitter<ITask>();

  @Input() set setTaskItem(value: ITask) {
    this.taskItem.set(value);
    this.taskItemForm().get('selectedTaskItem')?.setValue(value.isCompleted);
    this.completedDate.set(formatDateHelper(value.date));
  }

  protected taskItemForm: WritableSignal<FormGroup> = signal(new FormGroup({}));
  protected titleModal: WritableSignal<string> = signal('');
  protected subtitleModal: WritableSignal<string> = signal('');
  protected actionsModal: WritableSignal<IActions> = signal({} as IActions);
  protected showModal: WritableSignal<boolean> = signal(false);
  protected hasEditItem: WritableSignal<boolean> = signal(false);
  protected taskItem: WritableSignal<ITask> = signal({} as ITask);
  protected completedDate: WritableSignal<string> = signal('')

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.createForm();
  }

  public createForm(): void {
    this.taskItemForm.set(this.fb.group({
      selectedTaskItem: [false, [Validators.required, Validators.minLength(3)]],
      taskItem: [null],
    }));
  }

  ngOnInit() {
    this.taskItemForm().get('taskItem')?.setValue(this.taskItem().name);
  }

  public handleDeleteModal(): void {
    this.titleModal.set(EModalDataDelete.TITLE_DELETE);
    this.subtitleModal.set(EModalDataDelete.SUBTITLE_DELETE);
    this.actionsModal.set({
      primary: {
        label: EModalDataDelete.LABEL_PRIMARY,
        callback: () => this.$deleteTask.emit(),
      },
      secondary: {
        label: EModalDataDelete.LABEL_SECONDARY,
        callback: () => this.handleShowModal(),
      },
    });
    this.showModal.set(true);
  }

  public handleShowModal(): void {
    this.showModal.set(!this.showModal);
  }

  public handleEditItem(): void {
    this.hasEditItem.set(!this.hasEditItem());
    this.cdr.detectChanges();
    const input = document.getElementById(this.taskItem().id) as HTMLInputElement;
    if (input && this.hasEditItem()) {
      input.focus();
    }
  }

  public confirmEditItem(taskItem: ITask, isCompleted = false): void {
    if (!this.taskItemForm().value.taskItem) {
      return;
    }
    const newTask: ITask = {
      id: taskItem.id,
      date: new Date(),
      name: this.taskItemForm().value.taskItem,
      isCompleted: isCompleted,
    };
    this.$editTask.emit(newTask);
  }

  public setCompletedTask(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.confirmEditItem(this.taskItem(), inputElement.checked);
  }
}
