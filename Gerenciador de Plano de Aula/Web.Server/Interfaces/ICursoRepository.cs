using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface ICursoRepository
    {
        Task<IEnumerable<Curso>> GetAllAsync();
        Task<int> CriarAsync(Curso curso);
    }
}
