using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwapKeep.Models;
using SwapKeep.Repositories;
using System.Security.Claims;

namespace SwapKeep.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusRepository _statusRepo;

        public StatusController(IStatusRepository statusRepo)
        {
            _statusRepo = statusRepo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            if (_statusRepo.GetStatusById(id) == null)
            {
                return NotFound();
            }

            return Ok(_statusRepo.GetStatusById(id));
        }
    }
}
