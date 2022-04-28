using Microsoft.Extensions.Configuration;
using SwapKeep.Models;
using SwapKeep.Repositories;
using SwapKeep.Utils;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public class ItemRepository: BaseRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<Item> GetAllItems()
        {
            return null;
        }
    }
}
