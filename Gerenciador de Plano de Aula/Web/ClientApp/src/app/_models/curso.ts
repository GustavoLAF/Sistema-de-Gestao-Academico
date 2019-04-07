import { Usuario } from "./usuario";

export class Curso {
  id: number;
  nome: string;
  descricao: string;
  coordenadorId: string;

  coordenador: Usuario;
}
