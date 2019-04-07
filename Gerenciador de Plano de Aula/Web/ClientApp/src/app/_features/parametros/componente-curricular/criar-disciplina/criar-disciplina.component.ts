import { Component, OnInit } from '@angular/core';

import { Disciplina } from '../../../../_models/disciplina';

@Component({
  selector: 'criar-disciplina',
  templateUrl: './criar-disciplina.component.html',
  styleUrls: ['./criar-disciplina.component.css']
})
export class CriarDisciplinaComponent implements OnInit {

  disciplina: Disciplina;

  constructor() {
    this.disciplina = new Disciplina();
  }

  ngOnInit() {
  }

}
