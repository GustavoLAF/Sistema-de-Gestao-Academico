using System.ComponentModel.DataAnnotations;

namespace Web.Server.Models
{
    public class Disciplina
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public int PesoTeoria { get; set; }
        [Required]
        public int PesoPratica { get; set; }
    }
}
