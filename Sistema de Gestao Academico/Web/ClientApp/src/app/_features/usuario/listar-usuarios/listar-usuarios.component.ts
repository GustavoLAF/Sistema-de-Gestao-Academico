import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Usuario } from '../../../_models/usuario';
import { UsuarioService } from '../../../_services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: Usuario[];
  carregando: boolean;

  constructor(private usuarioService: UsuarioService) {
    this.usuarios = [];
    this.carregando = false;
  }

  ngOnInit() {
    this.buscar();
  }

  private buscar(): void {
    this.carregando = true;
    this.usuarioService
      .getAll()
      .pipe(finalize(() => this.carregando = false))
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
        }, error => {
          this.usuarios = [];
        });
  }

}
