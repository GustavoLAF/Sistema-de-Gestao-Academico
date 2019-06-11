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

  findByCargo(cargo: Cargos, q: string, pagesize: number): Observable<Usuario[]> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/usuarios/cargo/${cargo}`, params)
      .pipe(tap((usuarios: Usuario[]) => usuarios));
  }

  find(q: string, page: number, pagesize: number): Observable<any> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("page", page.toString());
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/usuarios`, params)
      .pipe(map(response => {
        if (response) {
          return { items: response.items as Usuario[], length: response.totalCount };
        }
      }));
  }

  criar(usuario: Usuario): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/usuarios`, usuario);
  }
}
