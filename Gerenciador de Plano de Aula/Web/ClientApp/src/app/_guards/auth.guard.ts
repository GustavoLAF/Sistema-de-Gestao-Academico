import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.estaLogado
      .pipe(
        take(1),
        map((estaLogado: boolean) => {
          if (!estaLogado) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        }));
  }
}
