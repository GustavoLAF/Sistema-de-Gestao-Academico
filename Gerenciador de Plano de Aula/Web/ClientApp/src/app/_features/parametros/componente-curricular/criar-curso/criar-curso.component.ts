import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert';

import { Curso } from '../../../../_models/curso';
import { CursoService } from '../../../../_services/curso.service';
import { UsuarioService } from '../../../../_services/usuario.service';
import { Usuario } from '../../../../_models/usuario';
import { Cargos } from '../../../../_enums/cargos.enum';

@Component({
  selector: 'criar-curso',
  templateUrl: './criar-curso.component.html',
  styleUrls: ['./criar-curso.component.css']
})
export class CriarCursoComponent implements OnInit {

  curso: Curso;
  coordenadores: Usuario[];
  salvando: boolean;

  constructor(private usuarioService: UsuarioService,
    private cursoService: CursoService) {
    this.curso = new Curso();
    this.coordenadores = [];
  }

  ngOnInit() { }

  buscarCoordenadores(q): void {
    this.usuarioService
      .findByCargo(Cargos.coordenador, q.query.toLowerCase(), 10)
      .subscribe(
        coordenadores => {
          this.coordenadores = coordenadores;
        }, error => {
          this.coordenadores = [];
        }
      );
  }
  aoSelecionarCoordenador(coordenador: Usuario) {
    this.curso.coordenadorId = coordenador.id;
  }
  criar(f: NgForm) {
    this.salvando = true;
    this.cursoService.criar(this.curso)
      .pipe(finalize(() => this.salvando = false))
      .subscribe(
        ok => {
          swal({
            title: "Sucesso!",
            text: "Curso cadastrado.",
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
