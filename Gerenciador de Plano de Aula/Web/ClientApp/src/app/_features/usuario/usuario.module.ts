import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AutoCompleteModule } from 'primeng/autocomplete';
import { NgxMaskModule } from 'ngx-mask'
import { Ng2BRPipesModule } from 'ng2-brpipes';

import { AdminGuard } from 'src/app/_guards/admin.guard';

import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    Ng2BRPipesModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: ListarUsuariosComponent, canActivate: [AdminGuard] },
      { path: 'criar', component: CriarUsuarioComponent, canActivate: [AdminGuard] }
    ])
  ],
  declarations: [
    ListarUsuariosComponent,
    CriarUsuarioComponent
  ],
  providers: [
    AdminGuard
  ]
})
export class UsuarioModule { }
