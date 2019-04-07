import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  criar(disciplina: Disciplina): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/disciplinas`, disciplina);
  }
}
