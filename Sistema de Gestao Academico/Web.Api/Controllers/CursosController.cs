using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Server.Interfaces;
using Web.Server.Models;

namespace Web.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class CursosController : ControllerBase
    {
        private readonly ICursoRepository _cursoRepository;

        public CursosController(ICursoRepository cursoRepository)
        {
            this._cursoRepository = cursoRepository ?? throw new System.ArgumentNullException(nameof(cursoRepository));
        }

        [HttpGet("find")]
        public async Task<IActionResult> FindByNomeAsync(string q = null, int pagesize = 10)
        {
            var cursos = await _cursoRepository.FindByNomeAsync(q, pagesize);

            if (cursos == null)
                return NotFound();

            return Ok(cursos);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAsync()
        {
            var cursos = await _cursoRepository.GetAllAsync();

            if (cursos == null)
                return NotFound();

            return Ok(cursos);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] Curso curso)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _cursoRepository.CriarAsync(curso);

            return Ok();
        }
    }
}