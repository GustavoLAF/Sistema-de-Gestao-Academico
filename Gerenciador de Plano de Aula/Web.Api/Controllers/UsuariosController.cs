using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;

        public UsuariosController(IUsuarioRepository usuarioRepository)
        {
            this._usuarioRepository = usuarioRepository ?? throw new ArgumentNullException(nameof(usuarioRepository));
        }

        [AllowAnonymous]
        [HttpPost("autenticar")]
        public async Task<IActionResult> Authenticate([FromBody]Credencial credencial)
        {
            var usuario = await _usuarioRepository.AutenticarAsync(credencial.Email, credencial.Senha);

            if (usuario == null)
                return BadRequest(new { message = "E-mail ou senha inválido" });

            return Ok(usuario);
        }
    }
}