import { sanitarizeCpf } from './helper';

describe('Helper', () => {
  it('Deve conter a função sanitarizeCpf', () => {
    expect(sanitarizeCpf).toBeTruthy();
  });

  it('Deve retornar undefined para o caso do cpf nulo ou em branco', () => {
    let cpf: any = '';

    expect(sanitarizeCpf(cpf)).toBe(undefined);

    cpf = null;

    expect(sanitarizeCpf(cpf)).toBe(undefined);
  });

  it('Deve retornar o cpf sanitarizado', () => {
    let cpf = '111.222.333.44';

    expect(sanitarizeCpf(cpf)).toBe('11122233344');
  });
});
