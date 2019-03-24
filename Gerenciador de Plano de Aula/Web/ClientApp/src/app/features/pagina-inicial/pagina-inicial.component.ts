import { Component, OnInit } from '@angular/core';

import { AutenticacaoService } from '../../services/autenticacao.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  usuario: Usuario;

  constructor(private authService: AutenticacaoService) {
    this.usuario = Usuario.usuarioMap(authService.usuarioCorrente);
  }

  ngOnInit() {
  }

}
