import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { getTasksMock } from '../../shared/mock-unit-test/response.mock';
import { By } from '@angular/platform-browser';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;
  const mockTask = getTasksMock[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.setTaskItem = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the task item details', () => {
    const taskNameElement = fixture.debugElement.query(
      By.css('[data-testid="custom-checkbox-text"')
    );
    expect(taskNameElement.nativeElement.textContent).toContain(mockTask.name);
  });

  it('should check the checkbox if the task is completed', () => {
    component.setTaskItem = { ...mockTask, isCompleted: true };
    fixture.detectChanges();

    const checkboxElement = fixture.debugElement.query(
      By.css('input[type="checkbox"]')
    );
    expect(checkboxElement.nativeElement.checked).toBeTrue();
  });

  it('should call handleDeleteModal when trash icon to be clicked', () => {
    component['hasEditItem'].set(false);
    const spyDeleteTask = spyOn(component.$deleteTask, 'emit');
    const spyShowModal = spyOn(component, 'handleShowModal').and.callThrough();
    fixture.detectChanges();
    const buttonDelete = fixture.debugElement.query(
      By.css('[data-testid="delete-item"]')
    );
    buttonDelete.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component['showModal']()).toBeTrue();

    component['actionsModal']().primary.callback();
    expect(spyDeleteTask).toHaveBeenCalled();

    component['actionsModal']().secondary.callback();
    expect(spyShowModal).toHaveBeenCalled();
  });

  it('should show input to edit task and change hasEditItem', () => {
    component['hasEditItem'].set(false);
    component.showActionsItem = true;
    fixture.detectChanges();
    const buttonEdit = fixture.debugElement.query(
      By.css('[data-testid="edit-item"]')
    );
    buttonEdit.triggerEventHandler('click');
    expect(buttonEdit).toBeTruthy();
    expect(component['hasEditItem']()).toBeTrue();
  });

  it('should confirm edit when click em button icon confirm', () => {
    component['hasEditItem'].set(true);
    component.showActionsItem = true;
    fixture.detectChanges();
    const spyEdit = spyOn(component.$editTask, 'emit');
    const buttonConfirmEdit = fixture.debugElement.query(
      By.css('[data-testid="confirm-edit-item"]')
    );
    expect(buttonConfirmEdit).toBeTruthy();
    buttonConfirmEdit.triggerEventHandler('click', component['taskItem']());
    fixture.detectChanges();
    expect(spyEdit).toHaveBeenCalled();
  });

  it('should go out function when taskForm not exists', () => {
    component['hasEditItem'].set(true);
    component.showActionsItem = true;
    component['taskItemForm']().get('taskItem')?.setValue(undefined);
    fixture.detectChanges();
    const spyEdit = spyOn(component.$editTask, 'emit');
    const buttonConfirmEdit = fixture.debugElement.query(
      By.css('[data-testid="confirm-edit-item"]')
    );
    expect(buttonConfirmEdit).toBeTruthy();
    buttonConfirmEdit.triggerEventHandler('click', component['taskItem']());
    fixture.detectChanges();
    expect(spyEdit).not.toHaveBeenCalled();
  });

  it("should call setCompletedTask when checkbox change", () => {
    const spy = spyOn(component, 'setCompletedTask').and.callThrough();
    const spyConfirm = spyOn(component, 'confirmEditItem').and.callThrough()
    fixture.detectChanges();
    const checkbox =  fixture.debugElement.query(
      By.css('[data-testid="checkbox"]')
    )
    checkbox.triggerEventHandler('change', {target: { checked: true}});
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
    expect(spyConfirm).toHaveBeenCalledWith(component['taskItem'](), true);
  })
})
