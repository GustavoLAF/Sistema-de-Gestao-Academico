using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class CursoRepository : ICursoRepository
    {
        private readonly AppDbContext _dbContext;

        public CursoRepository(AppDbContext dbContext)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<int> CriarAsync(Curso curso)
        {
            await _dbContext.Cursos.AddAsync(curso);
            _dbContext.SaveChanges();

            return curso.Id;
        }

        public async Task<IEnumerable<Curso>> GetAllAsync()
        {
            var cursos = await _dbContext.Cursos.ToArrayAsync();

            if (!cursos.Any())
                return null;

            return cursos;
        }
    }
}
