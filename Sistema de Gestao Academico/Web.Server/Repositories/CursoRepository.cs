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

        public async Task<IEnumerable<Curso>> FindByNomeAsync(string q = null, int pagesize = 10)
        {
            var sql = $@"SELECT TOP(@{nameof(pagesize)}) C.*
                           FROM Cursos C
                          WHERE (@{nameof(q)} IS NULL OR C.Nome LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY C.Nome";

            using (var connection = _connectionFactory.Invoke())
            {
                var cursos = await connection.QueryAsync<Curso>(sql, new { q, pagesize });

                if (cursos == null)
                    return null;

                return cursos;
            }
        }

        public async Task<PagedList<Curso>> FindAsync(string q = null, int page = 1, int pagesize = 50)
        {
            var sql = $@"SELECT * 
                           FROM Cursos C
                          INNER JOIN Usuarios U ON C.CoordenadorId = U.Id
                          WHERE (@{nameof(q)} IS NULL OR C.Nome LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY C.Nome
                         OFFSET @{nameof(pagesize)} * (@{nameof(page)} - 1) ROWS
                     FETCH NEXT @{nameof(pagesize)} ROWS ONLY";
            var sqlCount = $@"  
                   SELECT COUNT(*) as 'Quantidade Item'		                 
                     FROM Cursos C
                    WHERE (@{nameof(q)} IS NULL OR C.Nome LIKE CONCAT('%',@{nameof(q)},'%'))";

            using (var connection = _connectionFactory.Invoke())
            {
                var cursos = connection.Query<Curso, Usuario, Curso>(sql,
                    (curso, coordenador) =>
                    {
                        curso.CoordenadorId = coordenador.Id;
                        curso.Coordenador = coordenador;
                        return curso;
                    }, new { q, page, pagesize }, splitOn: "CoordenadorId");

                var totalCursos = await connection.QueryFirstAsync<int>(sqlCount, new { q });

                if (!cursos.Any())
                    return null;

                return new PagedList<Curso>
                {
                    Items = cursos,
                    PageNumber = page,
                    PageSize = pagesize,
                    TotalCount = totalCursos
                };
            }
        }
    }
}
