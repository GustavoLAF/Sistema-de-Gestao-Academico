export class Disciplina {
  id: number;
  nome: string;
  pesoTeoria: number;
  pesoPratica: number;
  cursoId: number;

  constructor() {
    this.pesoPratica = 0;
    this.pesoTeoria = 0;
  }
}
