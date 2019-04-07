using Dapper;
using System;
using System.Collections.Generic;
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

        public async Task<IEnumerable<Turma>> GetAllAsync()
        {
            var sql = "SELECT T.* FROM Turmas T";

            using (var connection = _connectionFactory.Invoke())
            {
                var turmas = await connection.QueryAsync<Turma>(sql);

                if (!turmas.Any())
                    return null;

                return turmas;
            }
        }
    }
}
