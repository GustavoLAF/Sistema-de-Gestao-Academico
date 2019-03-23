import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenHabilitado());
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(usuario: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.WebApiEndpoint}/usuarios/autenticar`, { usuario, senha })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.loggedIn.next(true);
        }
        return user;
      }));
  }
  logout(): void {
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);

  }
  private tokenHabilitado(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
