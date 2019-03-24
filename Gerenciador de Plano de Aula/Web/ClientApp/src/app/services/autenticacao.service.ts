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

  private logado = new BehaviorSubject<boolean>(this.tokenHabilitado());
  get estaLogado(): Observable<boolean> {
    return this.logado.asObservable();
  }

  get usuarioCorrente(): Usuario {
    return JSON.parse(localStorage.getItem('usuarioCorrente'));
  }

  constructor(private http: HttpClient) { }

  entrar(usuario: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.WebApiEndpoint}/usuarios/autenticar`, { usuario, senha })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('usuarioCorrente', JSON.stringify(user));
          this.logado.next(true);
        }
        return user;
      }));
  }
  sair(): void {
    localStorage.removeItem('usuarioCorrente');
    this.logado.next(false);

  }
  private tokenHabilitado(): boolean {
    return !!localStorage.getItem('usuarioCorrente');
  }
}
