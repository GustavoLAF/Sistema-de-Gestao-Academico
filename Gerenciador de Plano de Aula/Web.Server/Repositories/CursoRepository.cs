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
    public class CursoRepository : ICursoRepository
    {
        private readonly Func<IDbConnection> _connectionFactory;

        public CursoRepository(Func<IDbConnection> connectionFactory)
        {
            this._connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        }

        public async Task CriarAsync(Curso curso)
        {
            var sql = $@"INSERT INTO Cursos (Nome, Descricao, CoordenadorId) 
                         VALUES (@{nameof(curso.Nome)}, 
                                 @{nameof(curso.Descricao)}, 
                                 @{nameof(curso.CoordenadorId)})";

            using (var connection = _connectionFactory.Invoke())
            {
                await connection.ExecuteAsync(sql, new { curso.Nome, curso.Descricao, curso.CoordenadorId });
            }
        }

        public async Task<IEnumerable<Curso>> GetAllAsync()
        {
            var sql = "SELECT C.* FROM Cursos C";

            using (var connection = _connectionFactory.Invoke())
            {
                var cursos = await connection.QueryAsync<Curso>(sql);

                if (!cursos.Any())
                    return null;

                return cursos;
            }
        }
    }
}
