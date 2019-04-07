import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorInterceptor } from './_helpers/error.interceptor';

import { AuthGuard } from './_guards/auth.guard';
import { AuthService } from './_services/auth.service';
import { AlertService } from './_services/alert.service';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './_directives/alert/alert.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    AlertComponent,
    PaginaInicialComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: PaginaInicialComponent, canActivate: [AuthGuard] },
      { path: 'usuarios', loadChildren: './_features/usuario/usuario.module#UsuarioModule', canActivate: [AuthGuard] },
      { path: 'componente-curricular', loadChildren: './_features/parametros/componente-curricular/componente-curricular.module#ComponenteCurricularModule', canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
