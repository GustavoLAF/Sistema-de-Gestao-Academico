using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> AutenticarAsync(string email, string senha);
        Task<Usuario> GetById(int id);
        Task<IEnumerable<Usuario>> FindByCargoAsync(Cargos cargo, string q = null, int pagesize = 10);
        Task<IEnumerable<Usuario>> GetAllAsync();
        Task CriarAsync(Usuario usuario);
    }
}
