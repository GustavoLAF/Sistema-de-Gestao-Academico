import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Curso } from '../../../../_models/curso';
import { CursoService } from '../../../../_services/curso.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  q: string;

  cursos: Curso[];
  quantidades: number[];
  paginaSelecionada: number;
  quantidadeSelecionada: number;
  quantidadeItens: number;
  buscando: boolean;

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.inicializarBusca();
  }

  construirTabela(): void {
    this.cursos = [];
    this.quantidades = [10, 50, 100];
    this.quantidadeItens = 0;
    this.paginaSelecionada = 1;
    this.quantidadeSelecionada = this.quantidades[0];
  }

  inicializarBusca(): void {
    if (!this.cursos) {
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
    this.cursoService.find(
      this.q,
      this.paginaSelecionada,
      this.quantidadeSelecionada
    ).pipe(finalize(() => this.buscando = false))
      .subscribe((dados: any) => {
        if (dados && dados.items) {
          this.cursos = dados.items;
          this.quantidadeItens = dados.length;
          this.quantidades = [10, 50, 100, dados.length];
        }
      }, () => {
        this.construirTabela();
      });
  }

}
