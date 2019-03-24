using Microsoft.EntityFrameworkCore;
using Web.Server.Models;

namespace Web.Server.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<Usuario> Usuarios { get; set; }
    }
}
