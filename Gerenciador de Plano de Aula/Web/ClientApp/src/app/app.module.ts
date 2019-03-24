import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ErrorInterceptor } from './helpers/error.interceptor';

import { AuthGuard } from './guards/auth.guard';
import { AutenticacaoService } from './services/autenticacao.service';
import { AlertService } from './services/alert.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './public/login/login.component';
import { AlertComponent } from './directives/alert/alert.component';
import { PaginaInicialComponent } from './features/pagina-inicial/pagina-inicial.component';
import { UsuarioComponent } from './features/cadastros/usuario/usuario.component';
import { MateriaComponent } from './features/cadastros/materia/materia.component';
import { CursoComponent } from './features/cadastros/curso/curso.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    AlertComponent,
    PaginaInicialComponent,
    UsuarioComponent,
    MateriaComponent,
    CursoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PaginaInicialComponent, canActivate: [AuthGuard] },
      //{ path: 'cadastros/curso', component: CursoComponent, canActivate: [AuthGuard] },
      //{ path: 'cadastros/materia', component: MateriaComponent, canActivate: [AuthGuard] },
      //{ path: 'cadastros/usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    AuthGuard,
    AlertService,
    AutenticacaoService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
