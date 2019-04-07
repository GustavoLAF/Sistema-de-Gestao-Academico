import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';

import { AdminGuard } from '../../../_guards/admin.guard';
import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CursoService } from './../../../_services/curso.service';
import { ComponenteCurricularComponent } from './componente-curricular/componente-curricular.component';
import { CriarDisciplinaComponent } from './criar-disciplina/criar-disciplina.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    RouterModule.forChild([
      { path: '', component: ComponenteCurricularComponent, canActivate: [AdminGuard] },
      //{ path: 'criar', component: CriarCursoComponent, canActivate: [AdminGuard] }
    ])
  ],
  declarations: [
    CriarCursoComponent,
    ComponenteCurricularComponent,
    CriarDisciplinaComponent
  ],
  providers: [
    AdminGuard,
    CursoService
  ]
})
export class ComponenteCurricularModule { }
