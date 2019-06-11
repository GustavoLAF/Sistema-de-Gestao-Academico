using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface ICursoRepository
    {
        Task<IEnumerable<Curso>> FindByNomeAsync(string q = null, int pagesize = 10);
        Task<PagedList<Curso>> FindAsync(string q = null, int page = 1, int pagesize = 50);
        Task CriarAsync(Curso curso);
    }
}
