using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwapKeep.Models;
using SwapKeep.Repositories;

namespace SwapKeep.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepo;

        public ItemController(IItemRepository itemRepo)
        {
            _itemRepo = itemRepo;
        }

        [HttpGet("{zip}")]
        public IActionResult GetByZip(int zip)
        {
            return Ok(_itemRepo.GetItemsByZipCode(zip));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_itemRepo.GetAllItems());
        }

        [HttpGet("itemsofuser/{id}")]
        public IActionResult GetUserItems(int id)
        {
            return Ok(_itemRepo.GetItemsByUserId(id));
        }

        [HttpGet("item/{id}")]
        public IActionResult GetItemById(int id)
        {
            return Ok(_itemRepo.GetItemById(id));
        }

        [HttpPost]
        public IActionResult Post(Item item)
        {
            _itemRepo.AddItem(item);
            return CreatedAtAction("post", new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _itemRepo.DeleteItem(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _itemRepo.Update(item);
            return NoContent();
        }

    }
}
