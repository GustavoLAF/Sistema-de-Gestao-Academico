using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface ITurmaRepository
    {
        Task<PagedList<Turma>> FindAsync(string q = null, int page = 1, int pagesize = 50);

        Task CriarAsync(Turma turma);
    }
}
