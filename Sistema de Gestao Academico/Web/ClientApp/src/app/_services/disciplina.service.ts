import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Disciplina } from '../_models/disciplina';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private authService: AuthService) { }

  findByNome(q: string, pagesize: number): Observable<Disciplina[]> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/disciplinas/find`, params)
      .pipe(tap((disciplinas: Disciplina[]) => disciplinas));
  }

  find(q: string, page: number, pagesize: number): Observable<any> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("page", page.toString());
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/disciplinas`, params)
      .pipe(map(response => {
        if (response) {
          return { items: response.items as Disciplina[], length: response.totalCount };
        }
      }));
  }

  criar(disciplina: Disciplina): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/disciplinas`, disciplina);
  }
}
