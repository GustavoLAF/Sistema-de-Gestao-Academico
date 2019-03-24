using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
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
        private readonly AppDbContext _dbContext;

        public UsuarioRepository(IOptions<AppSettings> appSettings, AppDbContext dbContext)
        {
            this._appSettings = appSettings.Value ?? throw new ArgumentNullException(nameof(appSettings));
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<Usuario> AutenticarAsync(string email, string senha)
        {
            var usuario = await Task.Run(() => _dbContext.Usuarios.SingleOrDefault(u => u.Email == email && u.Senha == senha));

            if (usuario == null)
                return null;

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
    }
}
