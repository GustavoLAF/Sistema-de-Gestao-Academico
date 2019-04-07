import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente-curricular',
  templateUrl: './componente-curricular.component.html',
  styleUrls: ['./componente-curricular.component.css']
})
export class ComponenteCurricularComponent implements OnInit {

  tipoComponente: TipoComponente = 0;
  tiposComponente = TipoComponente;

  constructor() { }

  ngOnInit() {
  }

}

export enum TipoComponente {
  Curso = 1,
  Disciplina = 2,
  Turma = 3
}
