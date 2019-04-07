using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class SemestreRepository : ISemestreRepository
    {
        private readonly Func<IDbConnection> _connectionFactory;

        public SemestreRepository(Func<IDbConnection> connectionFactory)
        {
            this._connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        }

        public async Task<IEnumerable<Semestre>> FindByCodigoAsync(string q = null, int pagesize = 10)
        {
            var sql = $@"SELECT TOP(@{nameof(pagesize)}) S.*
                           FROM Semestres S
                          WHERE (@{nameof(q)} IS NULL OR S.Codigo LIKE CONCAT('%',@{nameof(q)},'%'))
                          ORDER BY S.Codigo DESC";

            using (var connection = _connectionFactory.Invoke())
            {
                var semestres = await connection.QueryAsync<Semestre>(sql, new { q, pagesize });

                if (semestres == null)
                    return null;

                return semestres;
            }
        }
    }
}
