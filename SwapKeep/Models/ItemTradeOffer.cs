namespace SwapKeep.Models
{
    public class ItemTradeOffer
    {
        public int Id { get; set; }

        public int Party1ItemId { get; set; }

        public int Party2ItemId { get; set; }

        public int StatusId { get; set; }
        
        public Item P1Item { get; set; }

        public Item P2Item { get; set; }

        public Status Status { get; set; }
    }
}
