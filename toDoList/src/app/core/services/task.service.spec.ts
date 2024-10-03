import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TaskService } from './task.service';
import { ITask } from '../../shared/interfaces/task';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/tasks';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve all tasks (getTasks)', () => {
    const dummyTasks: ITask[] = [
      {
        id: 1,
        name: 'Task 1',
        description: 'Description 1',
        status: 'pending',
        isCompleted: false,
        date: '2024-10-01',
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'Description 2',
        status: 'done',
        isCompleted: true,
        date: '2024-10-02',
      },
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should retrieve a task by ID (getTaskById)', () => {
    const dummyTask: ITask = {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      status: 'pending',
      isCompleted: false,
      date: '2024-10-01',
    };

    service.getTaskById(1).subscribe((task) => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTask);
  });

  it('should create a new task (createTask)', () => {
    const newTask: ITask = {
      id: 3,
      name: 'New Task',
      description: 'New Description',
      status: 'pending',
      isCompleted: false,
      date: '2024-10-03',
    };

    service.createTask(newTask).subscribe((task) => {
      expect(task).toEqual(newTask);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTask);
    req.flush(newTask);
  });

  it('should update an existing task (updateTask)', () => {
    const updatedTask: ITask = {
      id: 1,
      name: 'Updated Task',
      description: 'Updated Description',
      status: 'in-progress',
      isCompleted: false,
      date: '2024-10-01',
    };

    service.updateTask(1, updatedTask).subscribe((task) => {
      expect(task).toEqual(updatedTask);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTask);
    req.flush(updatedTask);
  });

  it('should mark a task as completed (markTaskAsCompleted)', () => {
    const completedTask: ITask = {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      status: 'done',
      isCompleted: true,
      date: '2024-10-01',
    };

    service.markTaskAsCompleted(1).subscribe((task) => {
      expect(task.isCompleted).toBe(true);
      expect(task.status).toBe('done');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ isCompleted: true, status: 'done' });
    req.flush(completedTask);
  });

  it('should delete a task (deleteTask)', () => {
    service.deleteTask(1).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle errors correctly (handleError)', () => {
    const errorMsg = 'Erro na operação. Por favor, tente novamente.';
    service.getTasks().subscribe(
      () => fail('The call should have failed!'),
      (error: Error) => {
        expect(error.message).toBe(errorMsg);
      }
    );

    const req = httpMock.expectOne(apiUrl);
    req.flush('Internal server error', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
