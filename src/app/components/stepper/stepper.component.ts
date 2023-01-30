import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
})
export class StepperComponent implements OnInit {
  steps = [
    {
      name: 'Início',
      active: true,
    },
    { name: 'Documentos', active: false },
    { name: 'Dados Cadastrais', active: false },
    { name: 'Admissão', active: false },
  ];

  constructor() {}

  ngOnInit() {}
}
