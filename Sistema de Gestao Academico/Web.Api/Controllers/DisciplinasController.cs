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
    public class DisciplinasController : ControllerBase
    {
        private readonly IDisciplinaRepository _disciplinaRepository;

        public DisciplinasController(IDisciplinaRepository disciplinaRepository)
        {
            this._disciplinaRepository = disciplinaRepository ?? throw new System.ArgumentNullException(nameof(disciplinaRepository));
        }

        [HttpGet("find")]
        public async Task<IActionResult> FindByNomeAsync(string q = null, int pagesize = 10)
        {
            var disciplinas = await _disciplinaRepository.FindByNomeAsync(q, pagesize);

            if (disciplinas == null)
                return NotFound();

            return Ok(disciplinas);
        }

        [HttpGet]
        public async Task<IActionResult> FindAsync(string q = null, int page = 1, int pagesize = 50)
        {
            var disciplinas = await _disciplinaRepository.FindAsync(q, page, pagesize);

            if (disciplinas == null)
                return NotFound();

            return Ok(disciplinas);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] Disciplina disciplina)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _disciplinaRepository.CriarAsync(disciplina);

            return Ok();
        }
    }
}