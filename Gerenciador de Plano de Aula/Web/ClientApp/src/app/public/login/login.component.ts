import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credencial } from '../../models/credencial';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { AlertService } from '../../services/alert.service';

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
    private authService: AutenticacaoService,
    private alertService: AlertService) {
    this.credencial = new Credencial();
    this.autenticando = false;
  }

  ngOnInit() {
    // reset login status
    this.authService.sair();

    // get return url from route parameters or default to '/'
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
          this.alertService.error(error);
          this.autenticando = false;
        });
  }

}
