import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Usuario } from '../_models/usuario';
import { AuthService } from '../_services/auth.service';
import { Cargos } from '../_enums/cargos.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.usuarioCorrente
      .pipe(
        take(1),
        map((usuario: Usuario) => {
          switch (usuario.cargo) {
            case Cargos.administrador:
              return true;
            case Cargos.administrador | Cargos.coordenador:
              return true;
            default:
              this.router.navigate(['/']);
              return false;
          }
        }));
  }
}
