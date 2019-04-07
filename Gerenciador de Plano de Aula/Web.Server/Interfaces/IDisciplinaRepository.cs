using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IDisciplinaRepository
    {
        Task<IEnumerable<Disciplina>> GetAllAsync();
        Task<int> CriarAsync(Disciplina disciplina);
    }
}
