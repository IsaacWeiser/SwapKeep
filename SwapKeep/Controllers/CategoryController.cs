using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwapKeep.Repositories;

namespace SwapKeep.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _catRepo;

        public CategoryController(ICategoryRepository catRepo)
        {
            _catRepo = catRepo;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_catRepo.GetAllCategories());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var tst = _catRepo.getCategoryById(id);
            if (tst == null)
            {
                return NotFound();
            }

            return Ok(tst);
        }

    }
}
