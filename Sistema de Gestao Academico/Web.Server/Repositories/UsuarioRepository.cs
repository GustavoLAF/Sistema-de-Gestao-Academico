using Dapper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web.Server.Helpers;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Server.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppSettings _appSettings;
        private readonly Func<IDbConnection> _connectionFactory;

        public UsuarioRepository(IOptions<AppSettings> appSettings, Func<IDbConnection> connectionFactory)
        {
            this._appSettings = appSettings.Value ?? throw new ArgumentNullException(nameof(appSettings));
            this._connectionFactory = connectionFactory ?? throw new ArgumentNullException(nameof(connectionFactory));
        }

        public async Task<Usuario> AutenticarAsync(string email, string senha)
        {
            var sql = $@"SELECT U.* 
                           FROM Usuarios U
                          WHERE U.Email = @{nameof(email)}
                            AND U.Senha = @{nameof(senha)}";

            Usuario usuario = null;
            using (var connection = _connectionFactory.Invoke())
            {
                usuario = await connection.QuerySingleOrDefaultAsync<Usuario>(sql, new { email, senha });

                if (usuario == null)
                    return null;
            }

            //JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            usuario.Token = tokenHandler.WriteToken(token);

            usuario.Senha = null;
            return usuario;
        }

        public async Task<Usuario> GetById(int id)
        {
            var sql = $@"SELECT U.* 
                           FROM Usuarios U
                          WHERE U.Id = @{nameof(id)}";

            using (var connection = _connectionFactory.Invoke())
            {
                var usuario = await connection.QueryFirstOrDefaultAsync<Usuario>(sql);

                if (usuario == null)
                    return null;

                return usuario;
            }
        }

        public async Task<IEnumerable<Usuario>> FindByCargoAsync(Cargos cargo, string q = null, int pagesize = 10)
        {
            //TODO: Arrumar operação BITWISE
            var sql = $@"SELECT TOP(@{nameof(pagesize)}) U.*
                         
                           FROM Usuarios U
                          WHERE U.Cargo = U.Cargo | @{nameof(cargo)}
                            AND (@{nameof(q)} IS NULL OR (U.Nome LIKE CONCAT('%',@{nameof(q)},'%') 
                                                      OR  U.Sobrenome LIKE CONCAT('%',@{nameof(q)},'%')))
                          ORDER BY U.Nome";

            using (var connection = _connectionFactory.Invoke())
            {
                var usuarios = await connection.QueryAsync<Usuario>(sql, new { cargo = (int)cargo, q, pagesize });

                if (usuarios == null)
                    return null;

                return usuarios;
            }
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            var sql = "SELECT U.* FROM Usuarios U";

            using (var connection = _connectionFactory.Invoke())
            {
                var usuarios = await connection.QueryAsync<Usuario>(sql);

                if (!usuarios.Any())
                    return null;

                return usuarios;
            }
        }

        public async Task CriarAsync(Usuario usuario)
        {
            var sql = $@"INSERT INTO Usuarios (Nome, Sobrenome, Cpf, DataNascimento, Email, Cargo, Senha) 
                         VALUES (@{nameof(usuario.Nome)}, 
                                 @{nameof(usuario.Sobrenome)}, 
                                 @{nameof(usuario.Cpf)}, 
                                 @{nameof(usuario.DataNascimento)},
                                 @{nameof(usuario.Email)},
                                 @{nameof(usuario.Cargo)},
                                 @{nameof(usuario.Senha)})";

            using (var connection = _connectionFactory.Invoke())
            {
                await connection.ExecuteAsync(sql, new { usuario.Nome, usuario.Sobrenome, usuario.Cpf, usuario.DataNascimento, usuario.Email, usuario.Cargo, usuario.Senha });
            }
        }
    }
}
