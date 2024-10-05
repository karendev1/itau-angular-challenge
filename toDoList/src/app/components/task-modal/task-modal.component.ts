import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IActions } from '../../shared/interfaces/actions.interface';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  @Input() openModal!: boolean;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() actions!: IActions;

}
