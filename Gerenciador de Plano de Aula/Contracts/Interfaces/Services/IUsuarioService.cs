using Contracts.Entities;
using System.Threading.Tasks;

namespace Contracts.Interfaces
{
    public interface IUsuarioService
    {
        Task<Usuario> AutenticarAsync(Credencial credencial);
    }
}
