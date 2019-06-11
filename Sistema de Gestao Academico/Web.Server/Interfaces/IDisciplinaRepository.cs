using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IDisciplinaRepository
    {
        Task<IEnumerable<Disciplina>> FindByNomeAsync(string q = null, int pagesize = 10);
        Task<PagedList<Disciplina>> FindAsync(string q = null, int page = 1, int pagesize = 50);
        Task CriarAsync(Disciplina disciplina);
    }
}
