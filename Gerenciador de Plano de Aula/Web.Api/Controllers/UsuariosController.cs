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

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var usuario = await _usuarioRepository.GetById(id);

            if (usuario == null)
                return NotFound();

            return Ok(usuario);
        }

        [HttpGet("cargo/{cargo}")]
        public async Task<IActionResult> FindByCargoAsync(Cargos cargo, string q = null, int pagesize = 10)
        {
            var usuarios = await _usuarioRepository.FindByCargoAsync(cargo, q, pagesize);

            if (usuarios == null)
                return NotFound();

            return Ok(usuarios);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var usuarios = await _usuarioRepository.GetAllAsync();

            if (usuarios == null)
                return NotFound();

            return Ok(usuarios);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _usuarioRepository.CriarAsync(usuario);

            return Ok();
        }
    }
}