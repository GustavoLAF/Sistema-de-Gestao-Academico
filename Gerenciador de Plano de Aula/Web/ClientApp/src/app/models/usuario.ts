export class Usuario {
  id: string;
  nome: string;
  sobrenome: string;
  dataNascimento: Date;
  email: string;
  senha: string;
  cargo: string;
  token: string;

  get nomeCompleto(): string {
    return `${this.nome} ${this.sobrenome}`;
  }

  static map(usuario: Usuario): Usuario {
    let u = null;

    if (usuario) {
      u = new Usuario()
      u.id = usuario.id;
      u.nome = usuario.nome;
      u.sobrenome = usuario.sobrenome;
      u.email = usuario.email;
      u.senha = usuario.senha;
      u.cargo = usuario.cargo;
    }

    return u;
  }
}
