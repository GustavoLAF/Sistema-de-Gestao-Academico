using System;
using System.Linq;
using Web.Server.Models;

namespace Web.Server.DataContext
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext dbContext)
        {
            if (dbContext.Usuarios.Any())
            {
                return;
            }

            dbContext.Usuarios.Add(new Usuario
            {
                Cargo = Cargos.Administrador,
                Cpf = "111111111",
                DataNascimento = new DateTime(1990, 01, 01),
                Email = "admin@app.com",
                Nome = "Usuário",
                Sobrenome = "Admin",
                Senha = "admin"
            });

            dbContext.SaveChanges();
        }
    }
}
