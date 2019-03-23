import { Component } from '@angular/core';

import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private autenticacaoService: AutenticacaoService) {
    this.autenticacaoService.login('test@gmail.com', 'test')
      .subscribe(() => { });
  }
}
