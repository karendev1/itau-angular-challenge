import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletedTasksComponent } from './completed-tasks.component';
import { By } from '@angular/platform-browser';
import { getTasksMock } from '../../shared/mock-unit-test/response.mock';

describe('CompletedTasksComponent', () => {
  let component: CompletedTasksComponent;
  let fixture: ComponentFixture<CompletedTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedTasksComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedTasksComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display task items when tasksListCompleted is not empty', () => {
    component.tasksListCompleted = getTasksMock;

    fixture.detectChanges();

    const taskItems = fixture.debugElement.queryAll(
      By.css('[data-testId="task-item"]')
    );
    expect(taskItems.length).toBe(getTasksMock.length);
  });

  it('should display empty text when tasksListCompleted is empty', () => {
    component.tasksListCompleted = [];

    fixture.detectChanges();

    const emptyText = fixture.debugElement.query(
      By.css('[data-testId="empty-text"]')
    );
    expect(emptyText).toBeTruthy();
    expect(emptyText.nativeElement.textContent).toContain(
      'Nenhuma tarefa concluída.'
    );
  });

  it('should emit editTask event when an edit action is triggered', () => {
    spyOn(component.$editTask, 'emit');

    component.tasksListCompleted = getTasksMock;
    fixture.detectChanges();

    const taskItem = fixture.debugElement.query(
      By.css('[data-testId="task-item"]')
    );
    taskItem.triggerEventHandler('$editTask', getTasksMock);

    expect(component.$editTask.emit).toHaveBeenCalled();
  });

  it('should emit deleteTask event when a delete action is triggered', () => {
    spyOn(component.$deleteTask, 'emit');

    component.tasksListCompleted = getTasksMock;
    fixture.detectChanges();

    const taskItem = fixture.debugElement.query(
      By.css('[data-testId="task-item"]')
    );
    taskItem.triggerEventHandler('$deleteTask', getTasksMock[0].id);

    expect(component.$deleteTask.emit).toHaveBeenCalledWith(getTasksMock[0].id);
  });
});
