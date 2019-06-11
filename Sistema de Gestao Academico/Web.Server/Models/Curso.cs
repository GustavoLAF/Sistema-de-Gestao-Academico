using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Server.Models
{
    public class Curso
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Descricao { get; set; }
        [Required]
        public int CoordenadorId { get; set; }

        [NotMapped]
        public Usuario Coordenador { get; set; }
    }
}
