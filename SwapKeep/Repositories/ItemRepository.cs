using Microsoft.Extensions.Configuration;
using SwapKeep.Models;
using SwapKeep.Repositories;
using SwapKeep.Utils;
using System;
using System.Collections.Generic;



namespace SwapKeep.Repositories
{
    public class ItemRepository : BaseRepository, IItemRepository
    {
        public ItemRepository(IConfiguration configuration) : base(configuration) { }

        public List<Item> GetAllItems()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name, CategoryId, ImageUrl, UserId, Description, Condition, Available
                                        FROM Item";
                    var items = new List<Item>();
                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {

                            items.Add(new Item()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Condition = DbUtils.GetInt(reader, "Condition"),
                                Available = reader.GetBoolean(reader.GetOrdinal("Available"))
                            });

                        }

                        return items;

                    }

                }
            }
        }

        public List<Item> GetItemsByZipCode(int zip)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT i.Id as 'itemId', i.Name as 'itemName', i.CategoryId, i.ImageUrl, i.UserId, 
                                        i.Description, i.Condition, i.Available, u.ZipCode
                                        FROM Item i
                                        JOIN UserProfile u on u.Id = i.UserId
                                        WHERE u.ZipCode = @zip";
                    cmd.Parameters.AddWithValue("@zip", zip);

                    var items = new List<Item>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {

                            items.Add(new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Condition = DbUtils.GetInt(reader, "Condition"),
                                Available = reader.GetBoolean(reader.GetOrdinal("Available"))
                            });

                        }

                    }

                    return items;

                }
            }
        }

        public List<Item> GetItemsByUserId(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT i.Id as 'itemId', i.Name as 'itemName', i.CategoryId, i.ImageUrl, i.UserId, 
                                        i.Description, i.Condition, i.Available
                                        FROM Item i
                                        WHERE i.UserId = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var items = new List<Item>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {

                            items.Add(new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Condition = DbUtils.GetInt(reader, "Condition"),
                                Available = reader.GetBoolean(reader.GetOrdinal("Available"))
                            });

                        }

                    }

                    return items;

                }
            }

        }

        public Item GetItemById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT i.Id as 'itemId', i.Name as 'itemName', i.CategoryId, i.ImageUrl, i.UserId, 
                                        i.Description, i.Condition, i.Available, c.Id as 'catId', c.Name as 'categoryName'
                                        FROM Item i
                                        left join Category c on c.Id = i.CategoryId
                                        WHERE i.Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                   Item item = null;

                    using (var reader = cmd.ExecuteReader())
                    {

                        if (reader.Read())
                        {

                            item = new Item()
                            {
                                Id = DbUtils.GetInt(reader, "itemId"),
                                Name = DbUtils.GetString(reader, "itemName"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Condition = DbUtils.GetInt(reader, "Condition"),
                                Available = reader.GetBoolean(reader.GetOrdinal("Available")),
                                Category= new Category()
                                {
                                    Id =DbUtils.GetInt(reader, "catId"),
                                    Name = DbUtils.GetString(reader, "categoryName")
                                }
                            };

                        }
                       

                    }
                    return item;
                }
            }
        }

        public void AddItem(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" INSERT INTO Item ( Name, CategoryId,
                                        ImageUrl, UserId, Description, Condition, Available)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @categoryId, @imageUrl, @userId, @description, @condition, @available)";
                    cmd.Parameters.AddWithValue("@name", item.Name);
                    cmd.Parameters.AddWithValue("@categoryId", item.CategoryId);
                    cmd.Parameters.AddWithValue("@imageUrl", item.ImageUrl);
                    cmd.Parameters.AddWithValue("@userId", item.UserId);
                    cmd.Parameters.AddWithValue("@description", item.Description);
                    cmd.Parameters.AddWithValue("@condition", item.Condition);
                    cmd.Parameters.AddWithValue("@available", item.Available);

                    item.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteItem(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    try
                    {
                        cmd.CommandText = @"DELETE FROM Item WHERE Id = @id";
                        cmd.Parameters.AddWithValue("@id", id);
                        cmd.ExecuteNonQuery();
                    }
                    catch (Exception ex)
                    {
                        Console.Write(ex);
                    }
                }
            }
        }

        public void Update(Item item)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Item
                           SET Name = @name,
                               Description = @description,
                               CategoryId = @categoryId,
                               ImageUrl = @imageUrl,
                               UserId = @userId,
                               Condition = @condition,
                               Available = @available
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@name", item.Name);
                    DbUtils.AddParameter(cmd, "@Description", item.Description);
                    DbUtils.AddParameter(cmd, "@categoryId", item.CategoryId);
                    DbUtils.AddParameter(cmd, "@imageUrl", item.ImageUrl);
                    DbUtils.AddParameter(cmd, "@userId", item.UserId);
                    DbUtils.AddParameter(cmd, "@condition", item.Condition);
                    DbUtils.AddParameter(cmd, "@available", item.Available);
                    DbUtils.AddParameter(cmd, "@Id", item.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }




    }
}
