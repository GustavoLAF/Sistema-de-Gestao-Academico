import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  coordenadores: Usuario[];
  curso: Curso;

  constructor(private usuarioService: UsuarioService,
    private cursoService: CursoService) {
    this.curso = new Curso();
    this.coordenadores = [];
  }

  ngOnInit() {
    this.getCoordenadores();
  }

  getCoordenadores() {
    this.usuarioService
      .getByCargo(Cargos.coordenador)
      .subscribe(
        coordenadores => {
          this.coordenadores = coordenadores;
        }, error => {
          this.coordenadores = [];
        });
  }

  criar(f: NgForm) {
    this.cursoService
      .criar(this.curso)
      .subscribe(
        id => {
          alert('Curso criado com sucesso!');
          console.log('curso criado, id:', id);
          f.resetForm();
        }, error => {
          console.log('error ao criar curso', error);
        });
  }

}
