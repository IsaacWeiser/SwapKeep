using SwapKeep.Models;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public interface IItemTradeOfferRepository
    {
        void AddOffer(ItemTradeOffer offer);
        List<ItemTradeOffer> GetAll();
        ItemTradeOffer GetById(int id);
        public void DeleteOfferById(int id);
    }
}