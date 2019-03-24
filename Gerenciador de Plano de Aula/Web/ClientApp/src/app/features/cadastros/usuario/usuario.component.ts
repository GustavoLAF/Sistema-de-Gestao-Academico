import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario;
  senhaVerificacao: string;

  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  criar(): void {
    console.log('usuario', this.usuario);
  }

}
