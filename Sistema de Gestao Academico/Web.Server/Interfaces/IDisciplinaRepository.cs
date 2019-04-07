using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IDisciplinaRepository
    {
        Task<IEnumerable<Disciplina>> FindByNomeAsync(string q = null, int pagesize = 10);
        Task<IEnumerable<Disciplina>> GetAllAsync();
        Task CriarAsync(Disciplina disciplina);
    }
}
