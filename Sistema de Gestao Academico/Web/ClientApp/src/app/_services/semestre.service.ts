import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Semestre } from '../_models/semestre';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  constructor(private authService: AuthService) { }

  findByCodigo(q: string, pagesize: number): Observable<Semestre[]> {
    var params = new HttpParams();
    if (q) {
      params = params.set("q", q);
    }
    params = params.set("pagesize", pagesize.toString());

    return this.authService.get(`${environment.WebApiEndpoint}/semestres/find`, params)
      .pipe(tap((semestres: Semestre[]) => semestres));
  }
}
