using SwapKeep.Models;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAllCategories();
        string getCategoryById(int id);
    }
}