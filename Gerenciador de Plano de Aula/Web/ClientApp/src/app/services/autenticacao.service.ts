import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import 'rxjs/add/observable/of';

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

  private usuario = new BehaviorSubject<any>(this.usuarioStorage());
  get usuarioCorrente(): Observable<any> {
    return this.usuario.asObservable();
  }

  constructor(private http: HttpClient) { }

  entrar(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.WebApiEndpoint}/usuarios/autenticar`, { email, senha })
      .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('usuarioCorrente', JSON.stringify(user));
          this.usuario.next(Usuario.map(user));
          this.logado.next(true);
        }
        return user;
      }));
  }

  sair(): void {
    localStorage.removeItem('usuarioCorrente');
    this.usuario.next(null);
    this.logado.next(false);
  }

  private tokenHabilitado(): boolean {
    return !!localStorage.getItem('usuarioCorrente');
  }
  private usuarioStorage(): any {
    var json = JSON.parse(localStorage.getItem('usuarioCorrente'));
    return Usuario.map(json);
  }
}
