import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert';

import { Turma } from '../../../../_models/turma';
import { TurmaService } from '../../../../_services/turma.service';
import { CursoService } from '../../../../_services/curso.service';
import { Curso } from 'src/app/_models/curso';
import { Disciplina } from '../../../../_models/disciplina';
import { DisciplinaService } from '../../../../_services/disciplina.service';
import { Periodos } from '../../../../_enums/periodos.enum';
import { SemestreService } from '../../../../_services/semestre.service';
import { Semestre } from '../../../../_models/semestre';

@Component({
  selector: 'criar-turma',
  templateUrl: './criar-turma.component.html',
  styleUrls: ['./criar-turma.component.css']
})
export class CriarTurmaComponent implements OnInit {

  turma: Turma;
  periodos = Periodos;
  cursos: Curso[];
  disciplinas: Disciplina[];
  semestres: Semestre[]
  salvando: boolean;

  constructor(private turmaService: TurmaService,
    private cursoService: CursoService,
    private disciplinaService: DisciplinaService,
    private semestreService: SemestreService) {
    this.turma = new Turma();
    this.cursos = [];
    this.disciplinas = [];
    this.salvando = false;
  }

  ngOnInit() {
  }

  buscarCursos(q): void {
    this.cursoService
      .findByNome(q.query.toLowerCase(), 10)
      .subscribe(
        cursos => {
          this.cursos = cursos;
        }, error => {
          this.cursos = [];
        }
      );
  }
  aoSelecionarCurso(curso: Curso): void {
    this.turma.cursoId = curso.id;
  }
  buscarDisciplinas(q): void {
    this.disciplinaService
      .findByNome(q.query.toLowerCase(), 10)
      .subscribe(
        disciplinas => {
          this.disciplinas = disciplinas;
        }, error => {
          this.disciplinas = [];
        }
      );
  }
  aoSelecionarDisciplina(disciplina: Disciplina): void {
    this.turma.disciplinaId = disciplina.id;
  }
  buscarSemestres(q): void {
    this.semestreService
      .findByCodigo(q.query.toLowerCase(), 10)
      .subscribe(
        semestres => {
          this.semestres = semestres;
        }, error => {
          this.semestres = [];
        }
      );
  }
  aoSelecionarSemestre(semestre: Semestre): void {
    this.turma.semestreId = semestre.id;
  }
  criar(f: NgForm) {
    this.salvando = true;
    this.turmaService.criar(this.turma)
      .pipe(finalize(() => this.salvando = false))
      .subscribe(
        ok => {
          swal({
            title: "Sucesso!",
            text: "Turma cadastrada.",
            icon: "success"
          }).then(() => {
            f.resetForm();
          });
        }, error => {
          swal({
            title: "Ops!",
            text: "Houve algum problema... Tente novamente mais tarde.",
            icon: "warning"
          });
        });
  }

}
