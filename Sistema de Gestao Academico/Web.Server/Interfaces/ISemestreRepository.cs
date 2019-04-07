using System.Collections.Generic;
using System.Threading.Tasks;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface ISemestreRepository
    {
        Task<IEnumerable<Semestre>> FindByCodigoAsync(string q = null, int pagesize = 10);
    }
}
