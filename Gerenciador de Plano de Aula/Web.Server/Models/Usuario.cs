using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        [Required]
        public string Nome { get; set; }
        [Required]
        public string Sobrenome { get; set; }
        [Required]
        public string Cpf { get; set; }
        [Required]
        public DateTime DataNascimento { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public Cargos Cargo { get; set; }
        [Required]
        public string Senha { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}
