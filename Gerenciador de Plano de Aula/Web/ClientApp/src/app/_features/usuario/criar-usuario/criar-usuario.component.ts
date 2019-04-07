import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../_models/usuario';
import { Cargos } from '../../../_enums/cargos.enum';
import { UsuarioService } from '../../../_services/usuario.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-criar-usuario',
  templateUrl: './criar-usuario.component.html',
  styleUrls: ['./criar-usuario.component.css']
})
export class CriarUsuarioComponent implements OnInit {

  usuario: Usuario;
  cargos = Cargos;

  constructor(private usuarioService: UsuarioService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  aoSelecionarCargo(checked: any, cargo: Cargos): void {
    if (checked.currentTarget.checked) {
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
    this.usuarioService.criar(this.usuario)
      .subscribe(
        id => {
          alert('Usuário criado com sucesso!');
          console.log('usuário criado, id:', id);
          f.resetForm();
        }, error => {
          console.log('erro ao criar usuário', error);
        });
  }

}
