import { Periodos } from "../_enums/periodos.enum";
import { Curso } from "./curso";
import { Disciplina } from "./disciplina";
import { Semestre } from "./semestre";
import { Usuario } from "./usuario";

export class Turma {
  id: number;
  codigo: string;
  periodo: Periodos;
  cursoId: number;
  disciplinaId: number;
  semestreId: number;
  professorId: number;

  curso: Curso;
  disciplina: Disciplina;
  semestre: Semestre;
  professor: Usuario;
}
