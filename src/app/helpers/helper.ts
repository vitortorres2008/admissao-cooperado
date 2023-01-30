export const sanitarizeCpf = function (cpf?: string): any {
  if (!cpf) return;
  cpf = cpf.replace('.', '');
  cpf = cpf.replace('-', '');
  if (cpf.indexOf('-') !== -1 || cpf.indexOf('.') !== -1) {
    return sanitarizeCpf(cpf);
  }
  return cpf;
};
