import { Component, OnInit } from '@angular/core';

import { Curso } from '../../../models/curso';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  curso: Curso;

  constructor() {
    this.curso = new Curso();
  }

  ngOnInit() {
  }

  criar(): void {
    console.log('curso', this.curso);
  }
}
