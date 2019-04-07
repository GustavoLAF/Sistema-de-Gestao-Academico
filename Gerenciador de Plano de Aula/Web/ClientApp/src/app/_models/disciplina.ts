import { Curso } from "./curso";

export class Disciplina {
  id: number;
  nome: string;
  pesoTeoria: number;
  pesoPratica: number;
  cursoId: number;

  curso: Curso;
}
