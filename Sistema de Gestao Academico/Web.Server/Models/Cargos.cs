using System;

namespace Web.Server.Models
{
    [Flags]
    public enum Cargos
    {
        Professor = 1 << 0,
        Coordenador = 1 << 1,
        Administrador = 1 << 2
    }
}
