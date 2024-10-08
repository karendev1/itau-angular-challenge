import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskService } from './core/services/task.service';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { ITask } from './shared/interfaces/task.interface';
import { getTasksMock } from './shared/mock-unit-test/response.mock';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: TaskService,
          useValue: {
            getTasks: (): Observable<ITask[]> => of(getTasksMock),
            createTask: (task: ITask): Observable<ITask> => of(getTasksMock[0]),
            deleteTask: (id: string): Observable<void> => EMPTY,
            updateTask: (task: ITask): Observable<ITask> => of(task)
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(
      TaskService
    );
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'toDoList' title`, () => {
    expect(component.title).toEqual('toDoList');
  });

  it('should call add task', () => {
    spyOn(service, 'createTask').and.returnValue(of(getTasksMock[0]));
    component['loading'].set(false);
    component['error'].set(false);
    fixture.detectChanges();
    const form = fixture.debugElement.query(
      By.css('[data-testid="task-form"]')
    )
    form.triggerEventHandler('$taskAdded')
    fixture.detectChanges();
    expect(service.createTask).toHaveBeenCalled();
  });

  
  it('should call delete task', () => {
    spyOn(service, 'deleteTask').and.returnValue(EMPTY);
    spyOn(component, 'getItemsList').and.callThrough();
    component['loading'].set(false);
    component['error'].set(false);
    fixture.detectChanges();
    const list = fixture.debugElement.query(
      By.css('[data-testid="task-list"]')
    )
    list.triggerEventHandler('$deleteTask', '1')
    fixture.detectChanges();
    expect(service.deleteTask).toHaveBeenCalled();
  });

  it('should call edit task', () => {
    spyOn(service, 'updateTask').and.returnValue(of(getTasksMock[0]));
    spyOn(component, 'getItemsList').and.callThrough();
    component['loading'].set(false);
    component['error'].set(false);
    fixture.detectChanges();
    const list = fixture.debugElement.query(
      By.css('[data-testid="task-list"]')
    )
    list.triggerEventHandler('$editTask', 'Edit Task')
    fixture.detectChanges();
    expect(service.updateTask).toHaveBeenCalled();
  });

  it("should catch error when call handleRequest parameter to equal the error", () => {
    spyOn(service, 'updateTask').and.returnValue(throwError(() => 'error'));
    spyOn(component, 'getItemsList').and.callThrough();
    component['loading'].set(false);
    component['error'].set(false);
    fixture.detectChanges();
    const list = fixture.debugElement.query(
      By.css('[data-testid="task-list"]')
    )
    list.triggerEventHandler('$editTask', 'Edit Task')
    fixture.detectChanges();
    expect(component['error']()).toBeTrue();
    expect(component.getItemsList).not.toHaveBeenCalled();
  })
});
