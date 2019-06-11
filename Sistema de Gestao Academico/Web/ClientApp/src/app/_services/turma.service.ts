import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Turma } from '../_models/turma';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private authService: AuthService) { }

  find(q: string, page: number, pagesize: number): Observable<any> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("page", page.toString());
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/turmas`, params)
      .pipe(map(response => {
        if (response) {
          return { items: response.items as Turma[], length: response.totalCount };
        }
      }));
  }

  criar(turma: Turma): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/turmas`, turma);
  }

}
