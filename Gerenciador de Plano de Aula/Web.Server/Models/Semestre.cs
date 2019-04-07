using System.ComponentModel.DataAnnotations;

namespace Web.Server.Models
{
    public class Semestre
    {
        public int Id { get; set; }
        [Required]
        public string Codigo { get; set; }
    }
}
