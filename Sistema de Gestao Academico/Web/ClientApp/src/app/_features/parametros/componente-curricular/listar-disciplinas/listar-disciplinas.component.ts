import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Disciplina } from '../../../../_models/disciplina';
import { DisciplinaService } from '../../../../_services/disciplina.service';

@Component({
  selector: 'app-listar-disciplinas',
  templateUrl: './listar-disciplinas.component.html',
  styleUrls: ['./listar-disciplinas.component.css']
})
export class ListarDisciplinasComponent implements OnInit {

  q: string;

  disciplinas: Disciplina[];
  quantidades: number[];
  paginaSelecionada: number;
  quantidadeSelecionada: number;
  quantidadeItens: number;
  buscando: boolean;

  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit() {
    this.inicializarBusca();
  }

  construirTabela(): void {
    this.disciplinas = [];
    this.quantidades = [10, 50, 100];
    this.quantidadeItens = 0;
    this.paginaSelecionada = 1;
    this.quantidadeSelecionada = this.quantidades[0];
  }

  inicializarBusca(): void {
    if (!this.disciplinas) {
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
    this.disciplinaService.find(
      this.q,
      this.paginaSelecionada,
      this.quantidadeSelecionada
    ).pipe(finalize(() => this.buscando = false))
      .subscribe((dados: any) => {
        if (dados && dados.items) {
          this.disciplinas = dados.items;
          this.quantidadeItens = dados.length;
          this.quantidades = [10, 50, 100, dados.length];
        }
      }, () => {
        this.construirTabela();
      });
  }

}
