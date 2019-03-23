using Contracts.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contracts.Interfaces
{
    public interface IUsuarioRepository
    {
        Task<Usuario> AutenticarAsync(string email, string senha);
        Task<IEnumerable<Usuario>> GetAll();
    }
}
