import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

fdescribe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit $taskAdded event when form is valid and submitted', () => {
    spyOn(component.$taskAdded, 'emit');

    const inputElement = fixture.debugElement.query(
      By.css('[data-testid="input"]')
    );
    const buttonElement = fixture.debugElement.query(
      By.css('[data-testid="add-button"]')
    );

    inputElement.nativeElement.value = 'Nova Tarefa';
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    buttonElement.nativeElement.click();

    expect(component.$taskAdded.emit).toHaveBeenCalledWith('Nova Tarefa');
    expect(component['taskForm']().value.task).toBe(null);
  });

  it('should disable the add button when the form is invalid', () => {
    const inputElement = fixture.debugElement.query(By.css('[data-testid="input"]'));
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="add-button"]'));

    inputElement.nativeElement.value = 'ab'; 
    inputElement.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(buttonElement.nativeElement.disabled).toBeTrue();
  });

  it('should enable the add button when the form is valid', () => {
    const inputElement = fixture.debugElement.query(By.css('[data-testid="input"]'));
    const buttonElement = fixture.debugElement.query(By.css('[data-testid="add-button"]'));

    inputElement.nativeElement.value = 'Nova Tarefa';
    inputElement.nativeElement.dispatchEvent(new Event('input')); 
    fixture.detectChanges();

    expect(buttonElement.nativeElement.disabled).toBeFalse();
  });
});
