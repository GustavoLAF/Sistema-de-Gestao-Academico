import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AutenticacaoService } from '../services/autenticacao.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  estaLogado: Observable<boolean>;
  usuario: Observable<Usuario>;

  constructor(private authService: AutenticacaoService) { }

  ngOnInit() {
    this.estaLogado = this.authService.estaLogado;
    this.authService.usuarioCorrente
      .subscribe(usuario => this.usuario = usuario);
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
