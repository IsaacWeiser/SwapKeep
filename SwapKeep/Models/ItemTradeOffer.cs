namespace SwapKeep.Models
{
    public class ItemTradeOffer
    {
        public int Id { get; set; }

        public int Party1ItemId { get; set; }

        public int Party2ItemId { get; set; }

        public int StatusId { get; set; }
        
        public Item p1Item { get; set; }

        public Item p2Item { get; set; }
    }
}
