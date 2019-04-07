using Microsoft.EntityFrameworkCore;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Usuario> Usuarios { get; set; }
        DbSet<Curso> Cursos { get; set; }
        DbSet<Disciplina> Disciplinas { get; set; }
        DbSet<Turma> Turmas { get; set; }
        DbSet<Semestre> Semestres { get; set; }
    }
}
