import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Usuario } from '../../../_models/usuario';
import { UsuarioService } from '../../../_services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  q: string;

  usuarios: Usuario[];
  quantidades: number[];
  paginaSelecionada: number;
  quantidadeSelecionada: number;
  quantidadeItens: number;
  buscando: boolean;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.inicializarBusca();
  }

  construirTabela(): void {
    this.usuarios = [];
    this.quantidades = [10, 50, 100];
    this.quantidadeItens = 0;
    this.paginaSelecionada = 1;
    this.quantidadeSelecionada = this.quantidades[0];
  }

  inicializarBusca(): void {
    if (!this.usuarios) {
      this.construirTabela();
    }
    this.paginaSelecionada = 1;
    this.buscar();
  }
  paginar(paginator: any): void {
    this.paginaSelecionada = paginator.page + 1;
    this.quantidadeSelecionada = paginator.rows;
    this.buscar();
  }
  buscar(): void {
    this.buscando = true;
    this.usuarioService.find(
      this.q,
      this.paginaSelecionada,
      this.quantidadeSelecionada
    ).pipe(finalize(() => this.buscando = false))
      .subscribe((dados: any) => {
        if (dados && dados.items) {
          this.usuarios = dados.items;
          this.quantidadeItens = dados.length;
          this.quantidades = [10, 50, 100, dados.length];
        }
      }, () => {
        this.construirTabela();
      });
  }

}
