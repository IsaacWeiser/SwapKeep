﻿namespace SwapKeep.Models
{
    public class ItemTradeOffer
    {
        public int Id { get; }

        public int Party1ItemId { get; set; }

        public int Party2ItemId { get; set; }

        public int StatusId { get; set; }
    }
}
