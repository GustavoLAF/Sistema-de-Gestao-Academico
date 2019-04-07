using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface ITurmaRepository
    {
        Task<IEnumerable<Turma>> GetAllAsync();
        Task CriarAsync(Turma turma);
    }
}
