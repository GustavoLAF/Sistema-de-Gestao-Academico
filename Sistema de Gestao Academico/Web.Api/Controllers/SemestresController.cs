using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Server.Interfaces;

namespace Web.Api.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class SemestresController : ControllerBase
    {
        private readonly ISemestreRepository _semestreRepository;

        public SemestresController(ISemestreRepository semestreRepository)
        {
            this._semestreRepository = semestreRepository ?? throw new System.ArgumentNullException(nameof(semestreRepository));
        }

        [HttpGet("find")]
        public async Task<IActionResult> FindByNomeAsync(string q = null, int pagesize = 10)
        {
            var semestres = await _semestreRepository.FindByCodigoAsync(q, pagesize);

            if (semestres == null)
                return NotFound();

            return Ok(semestres);
        }
    }
}