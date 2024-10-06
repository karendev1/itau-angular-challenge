import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskService } from './core/services/task.service';
import { Observable, of } from 'rxjs';
import { ITask } from './shared/interfaces/task.interface';
import { getTasksMock } from './shared/mock-unit-test/response.mock';

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
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(TaskService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'toDoList' title`, () => {
    expect(component.title).toEqual('toDoList');
  });

  it('should call getItemsList when init component', () => {
    const spyGetItemsList = spyOn(component, 'getItemsList');
    fixture.detectChanges();
    expect(spyGetItemsList).toHaveBeenCalled();
  });
});
