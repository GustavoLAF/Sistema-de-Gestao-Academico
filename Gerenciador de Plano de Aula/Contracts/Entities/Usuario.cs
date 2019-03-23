namespace Contracts.Entities
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public int Cargo { get; set; }
        public string Senha { get; set; }
        public string Token { get; set; }
    }
}
