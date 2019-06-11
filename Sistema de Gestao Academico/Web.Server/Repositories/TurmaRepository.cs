using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class TurmaRepository : ITurmaRepository
    {
        private readonly Func<IDbConnection> _connectionFactory;

        public TurmaRepository(Func<IDbConnection> connectionFactory)
        {
            this._connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        }

        public async Task CriarAsync(Turma turma)
        {
            var sql = $@"INSERT INTO Turmas (Codigo, Periodo, CursoId, DisciplinaId, SemestreId) 
                         VALUES (@{nameof(turma.Codigo)}, 
                                 @{nameof(turma.Periodo)}, 
                                 @{nameof(turma.CursoId)}, 
                                 @{nameof(turma.DisciplinaId)}, 
                                 @{nameof(turma.SemestreId)})";

            using (var connection = _connectionFactory.Invoke())
            {
                await connection.ExecuteAsync(sql, new { turma.Codigo, turma.Periodo, turma.CursoId, turma.DisciplinaId, turma.SemestreId });
            }
        }

        public async Task<PagedList<Turma>> FindAsync(string q = null, int page = 1, int pagesize = 50)
        {
            var sql = $@"SELECT T.* 
                           FROM Turmas T
                          WHERE (@{nameof(q)} IS NULL OR T.Codigo LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY T.Codigo
                         OFFSET @{nameof(pagesize)} * (@{nameof(page)} - 1) ROWS
                     FETCH NEXT @{nameof(pagesize)} ROWS ONLY";
            var sqlCount = $@"  
                   SELECT COUNT(*) as 'Quantidade Item'		                 
                     FROM Turmas T
                    WHERE (@{nameof(q)} IS NULL OR T.Codigo LIKE CONCAT('%',@{nameof(q)},'%'))";

            using (var connection = _connectionFactory.Invoke())
            {
                var turmas = await connection.QueryAsync<Turma>(sql, new { q, page, pagesize });
                var totalTurmas = await connection.QueryFirstAsync<int>(sqlCount, new { q });

                if (!turmas.Any())
                    return null;

                return new PagedList<Turma>
                {
                    Items = turmas,
                    PageNumber = page,
                    PageSize = pagesize,
                    TotalCount = totalTurmas
                };
            }
        }
    }
}
