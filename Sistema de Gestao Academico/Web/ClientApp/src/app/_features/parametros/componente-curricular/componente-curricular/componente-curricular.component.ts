import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-componente-curricular',
  templateUrl: './componente-curricular.component.html',
  styleUrls: ['./componente-curricular.component.css']
})
export class ComponenteCurricularComponent implements OnInit {

  tipoComponente: TipoComponente = 0;
  tiposComponente = TipoComponente;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.tipoComponente = params['componente'] as TipoComponente;
    });
  }

  ngOnInit() {
  }

}

export enum TipoComponente {
  Curso = 1,
  Disciplina = 2,
  Turma = 3
}
