import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import swal from 'sweetalert';

import { Disciplina } from '../../../../_models/disciplina';
import { DisciplinaService } from '../../../../_services/disciplina.service';

@Component({
  selector: 'criar-disciplina',
  templateUrl: './criar-disciplina.component.html',
  styleUrls: ['./criar-disciplina.component.css']
})
export class CriarDisciplinaComponent implements OnInit {

  disciplina: Disciplina;
  salvando: boolean;

  constructor(private disciplinaService: DisciplinaService) {
    this.disciplina = new Disciplina();
    this.salvando = false;
  }

  ngOnInit() {
  }

  criar(f: NgForm) {
    this.salvando = true;
    this.disciplinaService.criar(this.disciplina)
      .pipe(finalize(() => this.salvando = false))
      .subscribe(
        ok => {
          swal({
            title: "Sucesso!",
            text: "Disciplina cadastrada.",
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
