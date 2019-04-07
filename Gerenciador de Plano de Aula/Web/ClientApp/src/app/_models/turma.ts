import { Periodos } from "../_enums/periodos.enum";

export class Turma {
  id: number;
  codigo: string;
  periodo: Periodos;
  disciplinaId: number;
  semestreId: number;
}
