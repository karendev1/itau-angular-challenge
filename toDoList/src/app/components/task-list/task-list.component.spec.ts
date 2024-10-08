import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { getTasksMock } from '../../shared/mock-unit-test/response.mock';
import { By } from '@angular/platform-browser';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.tasksList = getTasksMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should show item list when tasks list lenght is greater than 1", () => {
    component.tasksList = getTasksMock;
    fixture.detectChanges();
    const item = fixture.debugElement.queryAll(By.css('[data-testid="item"]'));
    const emptyWarning = fixture.debugElement.query(By.css('[data-testid="empty-warning"]'));
    expect(item.length).toEqual(3);
    expect(emptyWarning).toBeFalsy();
  });

  it("should hidden item and show message empty when tasks list to be empty", () => {
    component.tasksList = [];
    fixture.detectChanges();
    const item = fixture.debugElement.queryAll(By.css('[data-testid="item"]'));
    const emptyWarning = fixture.debugElement.queryAll(By.css('[data-testid="empty-warning"]'));
    expect(item.length).toEqual(0);
    expect(emptyWarning).toBeTruthy();
  });

  it("should emit id when $deleteTask to call", () => {
    component.tasksList = getTasksMock;
    const spy = spyOn(component.$deleteTask, 'emit');
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('[data-testid="item"]'));
    item.triggerEventHandler('$deleteTask');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('734cb163-e2cd-4801-b7f8-dda12b792114' );
  });

  it("should emit item when $editTask to call", () => {
    component.tasksList = getTasksMock;
    const spy = spyOn(component.$editTask, 'emit');
    fixture.detectChanges();
    const item = fixture.debugElement.query(By.css('[data-testid="item"]'));
    item.triggerEventHandler('$editTask', getTasksMock[0]);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(getTasksMock[0]);
  });
});
