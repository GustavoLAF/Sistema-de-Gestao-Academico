using Dapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class DisciplinaRepository : IDisciplinaRepository
    {
        private readonly Func<IDbConnection> _connectionFactory;

        public DisciplinaRepository(Func<IDbConnection> connectionFactory)
        {
            this._connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        }

        public async Task CriarAsync(Disciplina disciplina)
        {
            var sql = $@"INSERT INTO Disciplinas (Nome, PesoTeoria, PesoPratica) 
                         VALUES (@{nameof(disciplina.Nome)}, 
                                 @{nameof(disciplina.PesoTeoria)}, 
                                 @{nameof(disciplina.PesoPratica)})";

            using (var connection = _connectionFactory.Invoke())
            {
                await connection.ExecuteAsync(sql, new { disciplina.Nome, disciplina.PesoTeoria, disciplina.PesoPratica });
            }
        }

        public async Task<IEnumerable<Disciplina>> FindByNomeAsync(string q = null, int pagesize = 10)
        {
            var sql = $@"SELECT TOP(@{nameof(pagesize)}) D.*
                           FROM Disciplinas D
                          WHERE (@{nameof(q)} IS NULL OR D.Nome LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY D.Nome";

            using (var connection = _connectionFactory.Invoke())
            {
                var disciplinas = await connection.QueryAsync<Disciplina>(sql, new { q, pagesize });

                if (disciplinas == null)
                    return null;

                return disciplinas;
            }
        }

        public async Task<PagedList<Disciplina>> FindAsync(string q = null, int page = 1, int pagesize = 50)
        {
            var sql = $@"SELECT D.* 
                           FROM Disciplinas D
                          WHERE (@{nameof(q)} IS NULL OR D.Nome LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY D.Nome
                         OFFSET @{nameof(pagesize)} * (@{nameof(page)} - 1) ROWS
                     FETCH NEXT @{nameof(pagesize)} ROWS ONLY";
            var sqlCount = $@"  
                   SELECT COUNT(*) as 'Quantidade Item'		                 
                     FROM Disciplinas D
                    WHERE (@{nameof(q)} IS NULL OR D.Nome LIKE CONCAT('%',@{nameof(q)},'%'))";

            using (var connection = _connectionFactory.Invoke())
            {
                var disciplinas = await connection.QueryAsync<Disciplina>(sql, new { q, page, pagesize });
                var totalDisciplinas = await connection.QueryFirstAsync<int>(sqlCount, new { q });

                if (!disciplinas.Any())
                    return null;

                return new PagedList<Disciplina>
                {
                    Items = disciplinas,
                    PageNumber = page,
                    PageSize = pagesize,
                    TotalCount = totalDisciplinas
                };
            }
        }
    }
}
