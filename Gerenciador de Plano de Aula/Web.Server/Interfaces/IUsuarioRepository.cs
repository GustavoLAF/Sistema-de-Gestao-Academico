using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> AutenticarAsync(string email, string senha);
    }
}
