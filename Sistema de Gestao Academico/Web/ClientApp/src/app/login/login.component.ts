import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credencial } from '../_models/credencial';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credencial: Credencial;
  autenticando: boolean;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) {
    this.credencial = new Credencial();
    this.autenticando = false;
  }

  ngOnInit() {
    this.authService.sair();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.autenticando = true;
    this.authService.entrar(this.credencial.email, this.credencial.senha)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.credencial.senha = null;
          this.alertService.error(error);
          this.autenticando = false;
        });
  }

}
