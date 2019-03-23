using Contracts.Entities;
using Contracts.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web.Api.Helpers;

namespace Web.Api.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly AppSettings _appSettings;
        private List<Usuario> _usuarios = new List<Usuario>
        {
            new Usuario { Id = 1, Nome = "Test", Sobrenome = "User", Email = "test@gmail.com", Senha = "test" }
        };

        public UsuarioRepository(IOptions<AppSettings> appSettings)
        {
            this._appSettings = appSettings.Value ?? throw new ArgumentNullException(nameof(appSettings));
        }

        public async Task<Usuario> AutenticarAsync(string email, string senha)
        {
            var usuario = await Task.Run(() => _usuarios.SingleOrDefault(u => u.Email == email && u.Senha == senha));

            if (usuario == null)
                return null;

            // authentication successful so generate jwt token
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

        public Task<IEnumerable<Usuario>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
