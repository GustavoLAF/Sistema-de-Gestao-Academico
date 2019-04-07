using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class DisciplinaRepository : IDisciplinaRepository
    {
        private readonly AppDbContext _dbContext;

        public DisciplinaRepository(AppDbContext dbContext)
        {
            this._dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<int> CriarAsync(Disciplina disciplina)
        {
            await _dbContext.Disciplinas.AddAsync(disciplina);
            _dbContext.SaveChanges();

            return disciplina.Id;
        }

        public async Task<IEnumerable<Disciplina>> GetAllAsync()
        {
            var disciplinas = await _dbContext.Disciplinas.ToArrayAsync();

            if (!disciplinas.Any())
                return null;

            return disciplinas;
        }
    }
}
