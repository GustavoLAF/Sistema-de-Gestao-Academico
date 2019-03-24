using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Server.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Cpf { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Email { get; set; }
        public Cargos Cargo { get; set; }
        public string Senha { get; set; }

        [NotMapped]
        public string Token { get; set; }
    }
}
