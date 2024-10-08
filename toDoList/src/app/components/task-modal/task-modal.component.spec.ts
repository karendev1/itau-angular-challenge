import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskModalComponent } from './task-modal.component';
import { By } from '@angular/platform-browser';

function testPrimaryButton(): void {
  console.log('Primary button clicked');
}

function testSecondaryButton(): void {
  console.log('Secondary button clicked');
}

describe('TaskModalComponent', () => {
  let component: TaskModalComponent;
  let fixture: ComponentFixture<TaskModalComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModalComponent);
    component = fixture.componentInstance;
    component.actions = {
      primary: {
        label: 'Continuar',
        callback: jasmine.createSpy('primaryCallback')
      },
      secondary: {
        label: 'Cancelar',
        callback: jasmine.createSpy('primaryCallback')
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show modal when openModal to equal true', () => {
    component.openModal = true;
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('[data-testid="modal"]'));
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    );
    expect(modal).toBeTruthy();
    expect(overlay).toBeTruthy();
  });

  it('should hidden modal when openModal to equal true', () => {
    component.openModal = false;
    fixture.detectChanges();
    const modal = fixture.debugElement.query(By.css('[data-testid="modal"]'));
    const overlay = fixture.debugElement.query(
      By.css('[data-testid="overlay"]')
    );
    expect(modal).toBeFalsy();
    expect(overlay).toBeFalsy();
  });

  it('should callback primary when click in primary button', () => {
    component.openModal = true;
    fixture.detectChanges();
    const primaryButton = fixture.debugElement.query(
      By.css('[data-testid="primary-button"]')
    );
    primaryButton.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.actions.primary.callback).toHaveBeenCalled();
  });

  it('should callback secondary when click in secondary button', () => {
    component.openModal = true;
    fixture.detectChanges();
    const primaryButton = fixture.debugElement.query(
      By.css('[data-testid="secondary-button"]')
    );
    primaryButton.triggerEventHandler('click');
    fixture.detectChanges();
    expect(component.actions.secondary.callback).toHaveBeenCalled();
  });
});

