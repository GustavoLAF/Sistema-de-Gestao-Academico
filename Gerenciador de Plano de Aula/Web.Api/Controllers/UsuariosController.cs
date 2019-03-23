using Contracts.Entities;
using Contracts.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
            var usuario = await _usuarioRepository.AutenticarAsync(credencial.Usuario, credencial.Senha);

            if (usuario == null)
                return BadRequest(new { message = "E-mail ou senha inválidos" });

            return Ok(usuario);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok("TESTE OK");
        }
    }
}