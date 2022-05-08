using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SwapKeep.Models;
using SwapKeep.Repositories;
using System.Security.Claims;

namespace SwapKeep.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemTradeOfferController : ControllerBase
    {
        private readonly IItemTradeOfferRepository _offerRepo;
        private readonly IUserProfileRepository _userProfileRepo;

        public ItemTradeOfferController(IItemTradeOfferRepository offerRepo, IUserProfileRepository userProfile)
        {
            _offerRepo = offerRepo;
            _userProfileRepo = userProfile;
        }

        [HttpGet]
        public IActionResult GetAllTrades()
        {
            return Ok(_offerRepo.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            if (_offerRepo.GetById(id) == null)
            {
                return NotFound();
            }

            return Ok(_offerRepo.GetById(id));
        }

        [HttpGet("open/offersfrom/")]
        public IActionResult GetOpenTradesOfferedFrom()
        {
            UserProfile user = GetCurrentUserProfile();
            int id = user.Id;
            if (_offerRepo.GetById(id) == null)
            {
                return NotFound();
            }
            return Ok(_offerRepo.GetOpenTradesOfferingByUserId(id));
        }

        [HttpGet("open/offersto/")]
        public IActionResult GetOpenTradesOffersTo()
        {
            UserProfile user = GetCurrentUserProfile();
            int id = user.Id;
            if (_offerRepo.GetById(id) == null)
            {
                return NotFound();
            }
            return Ok(_offerRepo.GetOpenTradesOfferedToUserId(id));
        }

        [HttpGet("closed/offersfrom/")]
        public IActionResult GetTradesOfferedFrom()
        {
            UserProfile user = GetCurrentUserProfile();
            int id = user.Id;
            if (_offerRepo.GetById(id) == null)
            {
                return NotFound();
            }
            return Ok(_offerRepo.GetClosedTradesUserOffered(id));
        }

        [HttpGet("closed/offersto/")]
        public IActionResult GetClosedTradesOfferedTo()
        {
            UserProfile user = GetCurrentUserProfile();
            int id = user.Id;
            if (_offerRepo.GetById(id) == null)
            {
                return NotFound();
            }
            return Ok(_offerRepo.GetClosedTradesOfferedToUser(id));
        }

        [HttpPost]
        public IActionResult Post(ItemTradeOffer offer)
        {
            offer.StatusId = 1;
            _offerRepo.AddOffer(offer);
            return CreatedAtAction("Post", new { id = offer.Id }, offer);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _offerRepo.DeleteOfferById(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepo.GetByFirebaseUserId(firebaseUserId);
        }


    }
}
