import { Usuario } from "./usuario";

export class Curso {
  id: string;
  nome: string;
  descricao: string;
  coordenadorId: string;

  coordenador: Usuario;
}
