import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Turma } from '../_models/turma';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private authService: AuthService) { }

  criar(turma: Turma): Observable<any> {
    return this.authService.post(`${environment.WebApiEndpoint}/turmas`, turma);
  }

}
