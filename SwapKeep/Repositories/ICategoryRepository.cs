using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public interface ICategoryRepository
    {
        List<string> GetAllCategories();
        string getCategoryById(int id);
    }
}