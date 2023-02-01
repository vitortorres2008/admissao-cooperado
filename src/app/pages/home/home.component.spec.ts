import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { StepperModule } from 'src/app/components/stepper/stepper.module';
import { ApiService } from 'src/app/services/api.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, StepperModule],
      providers: [
        FormBuilder,
        {
          provide: ApiService,
          useValue: {
            getByCpf: jasmine.createSpy().and.returnValue(of({})),
          },
        },
      ],
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('Deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('Deve validar o cpf como requerido', () => {
    component.form.get('cpf')?.setValue('');
    component.onSubmit('');
    expect(component.error).toEqual('required');
  });

  it('Deve validar o pattern do cpf e retornar o erro de "pattern"', () => {
    const cpf = '11.22.-4';
    component.form.get('cpf')?.setValue(cpf);
    component.onSubmit(cpf);
    expect(component.error).toEqual('pattern');
  });

  it('Deve sanitarizar o cpf informado', () => {
    const cpf = '123.456.789-00';
    component.form.get('cpf')?.setValue(cpf);
    component.onSubmit(cpf);
    expect(apiService.getByCpf).toHaveBeenCalledWith('12345678900');
  });

  it('Deve retornar o erro "notfound" para caso de não encontrar o cpf informado', async () => {
    const cpf = '123.456.789-00';

    component.form.get('cpf')?.setValue(cpf);
    component.onSubmit(cpf);

    expect(component.error).toEqual('notfound');
  });

  it('Deve retornar erro "error" se a consulta falhar', () => {
    const cpf = '111.222.333-44';
    component.form.get('cpf')?.setValue(cpf);

    const apiSpy = jasmine.createSpyObj('api', ['getByCpf']);
    apiSpy.getByCpf.and.returnValue(throwError({}));

    component['api'] = apiSpy;
    component.onSubmit(cpf);

    expect(component.error).toBe('error');
  });

  it('Deve testar a propriedade loading do componente e retornar false', () => {
    const cpf = '123.456.789-00';
    component.form.get('cpf')?.setValue(cpf);
    component.onSubmit(cpf);
    expect(component.loading).toEqual(false);
  });

  it('Deve testar a mascara de cpf como válida', () => {
    const cpf = '123.456.789-00';
    component.form.get('cpf')?.setValue(cpf);
    component.maskCpf(cpf);
    expect(component.form.get('cpf')?.value).toBe('123.456.789-00');
  });

  it('Deve testar a mascara de cpf com valor nulo', () => {
    const cpf = '';
    component.form.get('cpf')?.setValue(cpf);
    component.maskCpf(cpf);
    expect(component.form.get('cpf')?.value).toBe('');
  });

  it('Deve retornar undefined caso a mascara seja nula ou menor que 14 digitos', () => {
    expect(component.maskCpf('')).toBe(undefined);
    expect(component.maskCpf('123456')).toBe(undefined);
  });

  it('Deve configurar a propriedade `persona` corretamente quando a resposta é obtida com sucesso da API.', () => {
    const cpf = '123.456.789-10';
    const persona = {
      cpf: '12345678910',
      name: 'Persona',
      status: 'regular',
      id: '1',
    };
    const apiSpy = jasmine.createSpyObj('api', ['getByCpf']);
    apiSpy.getByCpf.and.returnValue(of(persona));

    component.form.get('cpf')?.setValue(cpf);
    component['api'] = apiSpy;
    component.onSubmit(cpf);

    expect(component.persona).toEqual(persona);
  });
});
