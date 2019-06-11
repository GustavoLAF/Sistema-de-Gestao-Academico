using System;
using System.Linq;
using Web.Server.Models;

namespace Web.Server.DataContext
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext dbContext)
        {
            if (!dbContext.Usuarios.Any())
            {
                dbContext.Usuarios.AddRange(
                new Usuario
                {
                    Cargo = Cargos.Administrador,
                    Cpf = "111111111",
                    DataNascimento = new DateTime(1990, 05, 01),
                    Email = "admin@app.com",
                    Nome = "Usuário",
                    Sobrenome = "Admin",
                    Senha = "123"
                },
                new Usuario
                {
                    Cargo = Cargos.Administrador | Cargos.Coordenador,
                    Cpf = "222222222",
                    DataNascimento = new DateTime(1975, 05, 02),
                    Email = "admin-coordenador@app.com",
                    Nome = "Usuário",
                    Sobrenome = "Admin & Coordenador",
                    Senha = "123"
                },
                new Usuario
                {
                    Cargo = Cargos.Coordenador,
                    Cpf = "333333333",
                    DataNascimento = new DateTime(1980, 02, 05),
                    Email = "coordenador@app.com",
                    Nome = "Usuário",
                    Sobrenome = "Coordenador",
                    Senha = "123"
                },
                new Usuario
                {
                    Cargo = Cargos.Professor,
                    Cpf = "444444444",
                    DataNascimento = new DateTime(1983, 12, 11),
                    Email = "professor@app.com",
                    Nome = "Usuário",
                    Sobrenome = "Professor",
                    Senha = "123"
                });
            }

            if (!dbContext.Cursos.Any())
            {
                dbContext.Cursos.AddRange(
                new Curso
                {
                    Nome = "Engenharia da Computação",
                    Descricao = "Área voltada a desinstalação de BAIDU e formatação de PC",
                    CoordenadorId = 3
                },
                new Curso
                {
                    Nome = "Engenharia Civil",
                    Descricao = "Área voltada a erguer muros",
                    CoordenadorId = 3
                },
                new Curso
                {
                    Nome = "Engenharia Química",
                    Descricao = "Área voltada a produzir drogas",
                    CoordenadorId = 3
                }
                , new Curso
                {
                    Nome = "Engenharia de Alimentos",
                    Descricao = "Área voltada a produzir cachaça e sorvete",
                    CoordenadorId = 3
                });
            }

            if (!dbContext.Disciplinas.Any())
            {
                dbContext.Disciplinas.AddRange(
                new Disciplina
                {
                    Nome = "Algoritmos e Programação",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Lógica Computacional I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Lógica Computacional II",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Rede de Computadores I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Rede de Computadores II",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Estrutura de Dados I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Estrutura de Dados II",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Processamento de Sinais I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Eletrônica Digital I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Sistemas Operacionais",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Programação Orientada a Objetos I",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Programação Orientada a Objetos II",
                    PesoPratica = 50,
                    PesoTeoria = 50
                },
                new Disciplina
                {
                    Nome = "Computação Gráfica",
                    PesoPratica = 50,
                    PesoTeoria = 50
                });
            }

            if (!dbContext.Semestres.Any())
            {
                dbContext.Semestres.AddRange(
                new Semestre
                {
                    Codigo = "20171"
                },
                new Semestre
                {
                    Codigo = "20172"
                },
                new Semestre
                {
                    Codigo = "20181"
                },
                new Semestre
                {
                    Codigo = "20182"
                },
                new Semestre
                {
                    Codigo = "20191"
                },
                new Semestre
                {
                    Codigo = "20192"
                });
            }

            if (!dbContext.Turmas.Any())
            {
                dbContext.Turmas.AddRange(
                new Turma
                {
                    Codigo = "POO192",
                    CursoId = 1,
                    DisciplinaId = 6,
                    ProfessorId = 4,
                    Periodo = Periodos.Noturno,
                    SemestreId = 6
                });
            }

            dbContext.SaveChanges();
        }
    }
}
