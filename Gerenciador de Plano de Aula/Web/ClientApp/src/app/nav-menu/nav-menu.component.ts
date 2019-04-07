import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from '../_models/usuario';
import { Cargos } from '../_enums/cargos.enum';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  estaLogado: Observable<boolean>;
  usuario: Usuario;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.estaLogado = this.authService.estaLogado;
    this.authService.usuarioCorrente
      .subscribe(usuario => this.usuario = usuario);
  }

  eAdmin(): boolean {
    if (!this.usuario) { return; }
    return (this.usuario.cargo == (Cargos.administrador || (Cargos.administrador | Cargos.coordenador)));
  }

  isExpanded = false;
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
