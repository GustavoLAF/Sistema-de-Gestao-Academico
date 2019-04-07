import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

import { Usuario } from '../../../_models/usuario';
import { Cargos } from '../../../_enums/cargos.enum';
import { UsuarioService } from '../../../_services/usuario.service';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  usuario: Usuario;
  cargos = Cargos;
  salvando: boolean;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
    this.salvando = false;
  }

  ngOnInit() { }

  aoSelecionarCargo(checked: any, cargo: Cargos): void {
    if (checked) {
      this.usuario.cargo |= cargo;
    } else {
      this.usuario.cargo -= cargo;
    }
  }
  seForAdmin(): boolean {
    if (!this.usuario) return false;

    switch (this.usuario.cargo) {
      case Cargos.administrador:
        return true;
      case Cargos.administrador | Cargos.coordenador:
        return true;
      default:
        return false;
    }
  }
  seForProfessor(): boolean {
    if (!this.usuario) return false;

    switch (this.usuario.cargo) {
      case Cargos.professor:
        return true;
      case Cargos.professor | Cargos.coordenador:
        return true;
      default:
        return false;
    }
  }
  criar(f: NgForm): void {
    this.salvando = true;
    this.usuarioService.criar(this.usuario)
      .pipe(finalize(() => this.salvando = false))
      .subscribe(
        id => {
          swal({
            title: "Sucesso!",
            text: "Usuário cadastrado.",
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
