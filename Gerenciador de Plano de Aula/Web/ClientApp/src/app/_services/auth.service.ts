import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { Usuario } from "../_models/usuario";

@Injectable()
export class AuthService {

  private logado = new BehaviorSubject<boolean>(this.tokenHabilitado());
  get estaLogado(): Observable<boolean> {
    return this.logado.asObservable();
  }
  private usuario = new BehaviorSubject<any>(this.usuarioStorage());
  get usuarioCorrente(): Observable<any> {
    return this.usuario.asObservable();
  }

  constructor(private http: HttpClient) { }

  get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders(), params: params });
  }
  put(url: string, data: any, params?: HttpParams): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.put(url, body, { headers: this.getHeaders(), params: params });
  }
  delete(url: string, params?: HttpParams): Observable<any> {
    return this.http.delete(url, { headers: this.getHeaders(), params: params });
  }
  post(url: string, data: any, params?: HttpParams): Observable<any> {
    const body = JSON.stringify(data);
    return this.http.post(url, body, { headers: this.getHeaders(), params: params });
  }
  private getHeaders() {
    let headers = new HttpHeaders();
    headers = this.appendAuthHeader(headers);
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }
  private appendAuthHeader(headers: HttpHeaders) {
    return headers.set('Authorization', `Bearer ${this.tokenStorage()}`);
  }

  entrar(email: string, senha: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${environment.WebApiEndpoint}/usuarios/autenticar`, { email, senha })
      .pipe(map(usuario => {
        if (usuario && usuario.token) {
          localStorage.setItem('usuarioCorrente', JSON.stringify(usuario));
          this.usuario.next(Usuario.map(usuario));
          this.logado.next(true);
        }
        return usuario;
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
  private tokenStorage(): any {
    var json = <Usuario>JSON.parse(localStorage.getItem('usuarioCorrente'));
    if (!json) { return; }
    return json.token;
  }

}
