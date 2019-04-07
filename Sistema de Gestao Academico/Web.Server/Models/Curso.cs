using System.ComponentModel.DataAnnotations;

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
    }
}
