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
    public class TurmasController : ControllerBase
    {
        private readonly ITurmaRepository _turmaRepository;

        public TurmasController(ITurmaRepository turmaRepository)
        {
            this._turmaRepository = turmaRepository ?? throw new System.ArgumentNullException(nameof(turmaRepository));
        }

        [HttpGet]
        public async Task<IActionResult> FindAsync(string q = null, int page = 1, int pagesize = 50)
        {
            var turmas = await _turmaRepository.FindAsync(q, page, pagesize);

            if (turmas == null)
                return NotFound();

            return Ok(turmas);
        }

        [HttpPost]
        public async Task<IActionResult> CriarAsync([FromBody] Turma turma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _turmaRepository.CriarAsync(turma);

            return Ok();
        }
    }
}