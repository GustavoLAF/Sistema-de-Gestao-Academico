using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
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

        public async Task<Usuario> GetById(int id)
        {
            var usuario = await _dbContext.Usuarios.FirstOrDefaultAsync(u => u.Id == id);

            if (usuario == null)
                return null;

            return usuario;
        }

        public async Task<IEnumerable<Usuario>> GetByCargoAsync(Cargos cargo)
        {
            //TODO: Arrumar operação BITWISE
            var usuarios = await _dbContext.Usuarios.Where(u => u.Cargo == cargo).ToArrayAsync();

            if (usuarios == null)
                return null;

            return usuarios;
        }

        public async Task<IEnumerable<Usuario>> GetAllAsync()
        {
            var usuarios = await _dbContext.Usuarios.ToArrayAsync();

            if (!usuarios.Any())
                return null;

            return usuarios;
        }

        public async Task<int> CriarAsync(Usuario usuario)
        {
            await _dbContext.Usuarios.AddAsync(usuario);
            _dbContext.SaveChanges();

            return usuario.Id;
        }
    }
}
