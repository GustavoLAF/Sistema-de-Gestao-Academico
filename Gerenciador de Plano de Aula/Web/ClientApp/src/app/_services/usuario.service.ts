import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Usuario } from '../_models/usuario';
import { AuthService } from './auth.service';
import { Cargos } from '../_enums/cargos.enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private authService: AuthService) { }

  //getById(id: string): Observable<Usuario> {
  //  return this.http.get(`${environment.WebApiEndpoint}/usuarios/${id}`)
  //    .pipe(map((usuario: Usuario) => {
  //      return Usuario.map(usuario).shift();
  //    }));
  //}

  findByCargo(cargo: Cargos, q: string, pagesize: number): Observable<Usuario[]> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/usuarios/cargo/${cargo}`, params)
      .pipe(tap((usuarios: Usuario[]) => usuarios));
  }

  getAll(): Observable<Usuario[]> {
    return this.authService.get(`${environment.WebApiEndpoint}/usuarios`)
      .pipe(tap((usuarios: Usuario[]) => usuarios));
  }

  criar(usuario: Usuario): Observable<number> {
    return this.authService.post(`${environment.WebApiEndpoint}/usuarios`, usuario);
  }
}
