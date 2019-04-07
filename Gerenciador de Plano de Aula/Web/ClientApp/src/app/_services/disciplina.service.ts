import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { Disciplina } from '../_models/disciplina';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private authService: AuthService) { }

  criar(disciplina: Disciplina): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/disciplinas`, disciplina);
  }
}
