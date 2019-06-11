import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Turma } from '../../../../_models/turma';
import { TurmaService } from '../../../../_services/turma.service';

@Component({
  selector: 'app-listar-turma',
  templateUrl: './listar-turma.component.html',
  styleUrls: ['./listar-turma.component.css']
})
export class ListarTurmaComponent implements OnInit {

  q: string;

  turmas: Turma[];
  quantidades: number[];
  paginaSelecionada: number;
  quantidadeSelecionada: number;
  quantidadeItens: number;
  buscando: boolean;

  constructor(private turmaService: TurmaService) { }

  ngOnInit() {
    this.inicializarBusca();
  }

  construirTabela(): void {
    this.turmas = [];
    this.quantidades = [10, 50, 100];
    this.quantidadeItens = 0;
    this.paginaSelecionada = 1;
    this.quantidadeSelecionada = this.quantidades[0];
  }

  inicializarBusca(): void {
    if (!this.turmas) {
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
    this.turmaService.find(
      this.q,
      this.paginaSelecionada,
      this.quantidadeSelecionada
    ).pipe(finalize(() => this.buscando = false))
      .subscribe((dados: any) => {
        if (dados && dados.items) {
          this.turmas = dados.items;
          this.quantidadeItens = dados.length;
          this.quantidades = [10, 50, 100, dados.length];
        }
      }, () => {
        this.construirTabela();
      });
  }

}
