namespace SwapKeep.Models
{
    public class Item
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int CategoryId { get; set; }

        public string ImageUrl { get; set; }

        public int UserId { get; set; }

        public string Description { get; set; }

        public int Condition { get; set; }

        public bool Available { get;set; }

    }
}
