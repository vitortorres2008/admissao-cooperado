import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { StepperComponent } from './stepper.component';

describe('StepperComponent', () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepperComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve conter o array de steps', () => {
    let stepsMock = [
      {
        name: 'Início',
        active: true,
      },
      { name: 'Documentos', active: false },
      { name: 'Dados Cadastrais', active: false },
      { name: 'Admissão', active: false },
    ];

    component.steps = stepsMock;

    expect(component.steps).toEqual(stepsMock);
  });

  it('Deve conter o class "active" no item Início', () => {
    let stepsMock = [
      {
        name: 'Início',
        active: true,
      },
      { name: 'Documentos', active: false },
      { name: 'Dados Cadastrais', active: false },
      { name: 'Admissão', active: false },
    ];

    component.steps = stepsMock;

    const el = fixture.debugElement.query(By.css('.Active'));

    const selector = (el.nativeElement as HTMLElement).querySelector(
      '.Title'
    )?.textContent;

    expect(selector).toContain('Início');
  });
});
