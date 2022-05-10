using SwapKeep.Models;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public interface IItemTradeOfferRepository
    {
        void AddOffer(ItemTradeOffer offer);
        List<ItemTradeOffer> GetAll();
        public List<ItemTradeOffer> GetOpenTradesOfferingByUserId(int userId);
        public List<ItemTradeOffer> GetOpenTradesOfferedToUserId(int userId);
        public List<ItemTradeOffer> GetClosedTradesUserOffered(int userId);
        public List<ItemTradeOffer> GetClosedTradesOfferedToUser(int userId);
        public List<ItemTradeOffer> GetOpenTradesByUserId(int userId);
        public List<ItemTradeOffer> GetClosedTradesByUserId(int userId);
        public void Update(ItemTradeOffer trade);
        ItemTradeOffer GetById(int id);
        public void DeleteOfferById(int id);
    }
}