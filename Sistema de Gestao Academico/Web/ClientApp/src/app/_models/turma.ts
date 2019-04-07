import { Periodos } from "../_enums/periodos.enum";

export class Turma {
  id: number;
  codigo: string;
  periodo: Periodos;
  cursoId: number;
  disciplinaId: number;
  semestreId: number;
}
