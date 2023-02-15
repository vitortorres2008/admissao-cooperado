import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { sanitarizeCpf } from 'src/app/helpers/helper';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  person?: { id: string; name: string; cpf: string; status: string };
  error?: string;
  patternCpf =
    '([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})';

  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      cpf: [null, [Validators.required, Validators.pattern(this.patternCpf)]]
    })
  }

  onSubmit(cpf: string) {
    this.error = undefined;

    if (this.isCpfNull()) {
      this.error = 'required';
      return;
    }

    if (this.isCpfInValid()) {
      this.error = 'pattern';
      return;
    }

    this.loading = true;

    cpf = sanitarizeCpf(cpf);

    this.api.getByCpf(cpf).subscribe({
      next: (res) => {
        this.loading = false;
        if (!res || Object.keys(res).length === 0) {
          this.error = 'notfound';
          return;
        }
        this.person = res;
      },
      error: (err) => {
        this.error = 'error';
        this.loading = false;
      },
    });
  }

  isCpfNull() {
    return !!this.form.get('cpf')?.getError('required');
  }

  isCpfInValid() {
    return !!this.form.get('cpf')?.getError('pattern');
  }

  maskCpf(cpf?: string) {
    if (!cpf || cpf.length >= 14) return;
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    this.form.get('cpf')?.setValue(cpf);
  }
}
