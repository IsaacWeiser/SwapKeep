using Microsoft.Extensions.Configuration;

namespace SwapKeep.Repositories
{
    public class CategoryRepository : BaseRepository
    {
        public CategoryRepository(IConfiguration config) : base(config) { }


        public string getCategoryById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"";
                }

            }
        }


    }
}
