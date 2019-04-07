import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Curso } from '../_models/curso';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private authService: AuthService) { }

  criar(curso: Curso): Observable<number> {
    return this.authService.post(`${environment.WebApiEndpoint}/cursos`, curso);
  }
}
