import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Curso } from '../_models/curso';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private authService: AuthService) { }

  findByNome(q: string, pagesize: number): Observable<Curso[]> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/cursos/find`, params)
      .pipe(tap((cursos: Curso[]) => cursos));
  }

  criar(curso: Curso): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/cursos`, curso);
  }
}
