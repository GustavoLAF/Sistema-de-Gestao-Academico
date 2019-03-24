import { Component, OnInit } from '@angular/core';

import { Materia } from '../../../models/materia';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css']
})
export class MateriaComponent implements OnInit {

  materia: Materia;

  constructor() {
    this.materia = new Materia();
  }

  ngOnInit() {
  }

  criar(): void {
    console.log('matéria', this.materia);
  }

}
