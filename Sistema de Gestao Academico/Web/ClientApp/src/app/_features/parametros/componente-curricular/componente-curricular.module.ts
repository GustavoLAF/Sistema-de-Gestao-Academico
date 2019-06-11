import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

import { AdminGuard } from '../../../_guards/admin.guard';
import { CriarCursoComponent } from './criar-curso/criar-curso.component';
import { CursoService } from '../../../_services/curso.service';
import { ComponenteCurricularComponent } from './componente-curricular/componente-curricular.component';
import { CriarDisciplinaComponent } from './criar-disciplina/criar-disciplina.component';
import { CriarTurmaComponent } from './criar-turma/criar-turma.component';
import { DisciplinaService } from '../../../_services/disciplina.service';
import { TurmaService } from '../../../_services/turma.service';
import { ListarCursoComponent } from './listar-curso/listar-curso.component';
import { ListarDisciplinasComponent } from './listar-disciplinas/listar-disciplinas.component';
import { ListarTurmaComponent } from './listar-turma/listar-turma.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    DropdownModule,
    PaginatorModule,
    TooltipModule,
    RouterModule.forChild([
      { path: '', component: ComponenteCurricularComponent, canActivate: [AdminGuard] },
      { path: 'tipo/:componente', component: ComponenteCurricularComponent, canActivate: [AdminGuard] },
      { path: 'cursos', component: ListarCursoComponent, canActivate: [AdminGuard] },
      { path: 'disciplinas', component: ListarDisciplinasComponent, canActivate: [AdminGuard] },
      { path: 'turmas', component: ListarTurmaComponent, canActivate: [AdminGuard] }
    ])
  ],
  declarations: [
    CriarCursoComponent,
    ComponenteCurricularComponent,
    CriarDisciplinaComponent,
    CriarTurmaComponent,
    ListarCursoComponent,
    ListarTurmaComponent,
    ListarDisciplinasComponent
  ],
  providers: [
    AdminGuard,
    CursoService,
    DisciplinaService,
    TurmaService
  ]
})
export class ComponenteCurricularModule { }
