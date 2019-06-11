import { Cargos } from "../_enums/cargos.enum";

export class Usuario {
  id: string;
  cpf: string;
  nome: string;
  sobrenome: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  cargo: Cargos;
  token: string;

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }

  static map(usuario: Usuario): Usuario {
    let u = null;
    if (usuario) {
      u = new Usuario()
      u.id = usuario.id;
      u.cpf = usuario.cpf;
      u.nome = usuario.nome;
      u.sobrenome = usuario.sobrenome;
      u.email = usuario.email;
      u.senha = usuario.senha;
      u.cargo = usuario.cargo;
    }
    return u;
  }
}
