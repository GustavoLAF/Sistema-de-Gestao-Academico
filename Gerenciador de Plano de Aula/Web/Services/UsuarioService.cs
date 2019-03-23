using Contracts.Entities;
using Contracts.Interfaces;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Gerenciador_de_Plano_de_Aula.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public UsuarioService(IHttpClientFactory httpClientFactory)
        {
            this._httpClientFactory = httpClientFactory ?? throw new System.ArgumentNullException(nameof(httpClientFactory));
        }

        public async Task<Usuario> AutenticarAsync(Credencial credencial)
        {
            HttpClient client = _httpClientFactory.CreateClient("WebApi");
            var httpContent = new StringContent(JsonConvert.SerializeObject(credencial), Encoding.UTF8, "application/json");

            var response = await client.PostAsync("/usuarios/autenticar", httpContent);

            return JsonConvert.DeserializeObject<Usuario>(response.Content.ReadAsStringAsync().Result);
        }
    }
}
