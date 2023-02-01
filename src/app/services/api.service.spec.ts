import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(httpClientSpy);
  });

  it('Deve criar o componente', () => {
    expect(service).toBeTruthy();
  });

  it('Ele deve chamar um get com o endpoint correto', () => {
    const url = 'http://localhost:3000';
    const cpf = '11122233340';

    const user = [
      {
        id: 1,
        cpf: '11122233344',
        name: 'Mariane de Souza Oliveira',
        status: 'regular',
      },
    ];

    httpClientSpy.get.and.returnValue(of(user));

    service.getByCpf(cpf);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      url + '/personas?cpf=' + cpf
    );
  });

  it('Ele deve retornar o usuario correto de acordo com o cpf passado', () => {
    const cpf = '11122233340';
    const user = [
      {
        id: 1,
        cpf: '11122233344',
        name: 'Mariane de Souza Oliveira',
        status: 'regular',
      },
    ];

    httpClientSpy.get.and.returnValue(of(user));

    service.getByCpf(cpf).subscribe({
      next: (response) => {
        expect(response).toEqual(user[0]);
      },
    });
  });
});
