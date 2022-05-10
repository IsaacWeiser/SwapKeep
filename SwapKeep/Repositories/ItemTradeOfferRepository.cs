using Microsoft.Extensions.Configuration;
using SwapKeep.Models;
using SwapKeep.Repositories;
using SwapKeep.Utils;
using System;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public class ItemTradeOfferRepository : BaseRepository, IItemTradeOfferRepository
    {
        public ItemTradeOfferRepository(IConfiguration config) : base(config) { }

        public List<ItemTradeOffer> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Party1ItemId, Party2ItemId, StatusId FROM ItemTradeOffer";

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId")

                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public ItemTradeOffer GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {

                    cmd.CommandText = @"SELECT Id, Party1ItemId, Party2ItemId, StatusId FROM ItemTradeOffer
                                        WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    var offer = new ItemTradeOffer();

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            offer = new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId")
                            };
                        }

                        return offer;
                    }

                }
            }
        }

        public void AddOffer(ItemTradeOffer offer)
        {

            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ItemTradeOffer (Party1ItemId, Party2ItemId, StatusId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@party1ItemId, @party2ItemId, 1)";
                    DbUtils.AddParameter(cmd, "@party1ItemId", offer.Party1ItemId);
                    DbUtils.AddParameter(cmd, "@party2ItemId", offer.Party2ItemId);



                    offer.Id = (int)cmd.ExecuteScalar();
                }
            }

        }

        public void DeleteOfferById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    try
                    {
                        cmd.CommandText = @"DELETE FROM ItemTradeOffer WHERE Id = @id";
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

        public List<ItemTradeOffer> GetOpenTradesOfferingByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select o.Id as 'offerId', o.Party1ItemId, o.Party2ItemId, o.StatusId, 
                                        s.Name, i.UserId as 'partyUserId', i.ImageUrl, i.name as 'itemName'
                                        from ItemTradeOffer o 
                                        join Status s on s.Id = o.StatusId 
                                        join Item i on i.Id = o.Party1ItemId
                                        where s.Name ='Open' and i.UserId = @uid";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId")

                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public List<ItemTradeOffer> GetOpenTradesOfferedToUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select o.Id as 'offerId', o.Party1ItemId, o.Party2ItemId, o.StatusId, 
                                        s.Name, i.UserId as 'partyUserId', i.ImageUrl, i.name as 'itemName'
                                        from ItemTradeOffer o 
                                        join Status s on s.Id = o.StatusId 
                                        join Item i on i.Id = o.Party2ItemId
                                        where s.Name ='Open' and i.UserId = @uid";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId")

                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public List<ItemTradeOffer> GetClosedTradesUserOffered(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select o.Id as 'offerId', o.Party1ItemId, o.Party2ItemId, 
                                        s.Id as 'StatusId', s.Name as 'statusName', i.UserId as 'partyUserId'
                                        from ItemTradeOffer o 
                                        join Status s on s.Id = o.StatusId 
                                        join Item i on i.Id = o.Party1ItemId
                                        where (s.Name ='Closed' OR s.Name='Accepted' OR s.Name ='Declined' OR s.Name= 'Rescinded') 
                                        AND i.UserId =@uid;";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId"),
                                Status = new Status()
                                {
                                    Name = DbUtils.GetString(reader, "statusName")
                                }

                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public List<ItemTradeOffer> GetClosedTradesOfferedToUser(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select o.Id as 'offerId', o.Party1ItemId, o.Party2ItemId, 
                                        s.Id as 'StatusId', s.Name as 'statusName', i.UserId as 'partyUserId'
                                        from ItemTradeOffer o 
                                        join Status s on s.Id = o.StatusId 
                                        join Item i on i.Id = o.Party2ItemId
                                        where (s.Name ='Closed' OR s.Name='Accepted' OR s.Name ='Declined' OR s.Name= 'Rescinded') 
                                        AND i.UserId =@uid;";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId"),
                                Status = new Status()
                                {
                                    Name = DbUtils.GetString(reader, "statusName")
                                }

                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public List<ItemTradeOffer> GetOpenTradesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select ito.Id as 'offerId', s.Id as StatusId, s.Name as statusName,
                                        p1Item.Id as Party1ItemId, p1Item.UserId as p1User, p1Item.Name as p1ItemName, p1Item.ImageUrl as p1Img,  
                                        p2Item.Id as Party2ItemId, p2Item.UserId as p2User, p2Item.Name as p2ItemName, p2Item.ImageUrl as p2Img
                                        from ItemTradeOffer ito
                                        join Item as p1Item on p1Item.Id = ito.Party1ItemId
                                        join Item as p2Item on p2Item.Id = ito.Party2ItemId
                                        join Status s on s.Id = ito.StatusId
                                        where (p1Item.UserId = @uid or p2Item.UserId =@uid) and s.Name = 'Open'";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId"),
                                P1Item = new Item ()
                                {
                                    Id = DbUtils.GetInt(reader, "Party1ItemId"),
                                    Name= DbUtils.GetString(reader, "p1ItemName"),
                                    ImageUrl = DbUtils.GetString(reader, "p1Img"),
                                    UserId =DbUtils.GetInt(reader, "p1User")
                                },
                                P2Item = new Item()
                                {
                                    Id = DbUtils.GetInt(reader, "Party2ItemId"),
                                    Name = DbUtils.GetString(reader, "p2ItemName"),
                                    ImageUrl = DbUtils.GetString(reader, "p2Img"),
                                    UserId = DbUtils.GetInt(reader, "p2User")
                                },
                                Status = new Status()
                                {
                                    Id= DbUtils.GetInt(reader,"StatusId"),
                                    Name =DbUtils.GetString(reader, "statusName")
                                }


                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public List<ItemTradeOffer> GetClosedTradesByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"select ito.Id as 'offerId', s.Id as StatusId, s.Name as statusName,
                                        p1Item.Id as Party1ItemId, p1Item.UserId as p1User, p1Item.Name as p1ItemName, p1Item.ImageUrl as p1Img,  
                                        p2Item.Id as Party2ItemId, p2Item.UserId as p2User, p2Item.Name as p2ItemName, p2Item.ImageUrl as p2Img
                                        from ItemTradeOffer ito
                                        join Item as p1Item on p1Item.Id = ito.Party1ItemId
                                        join Item as p2Item on p2Item.Id = ito.Party2ItemId
                                        join Status s on s.Id = ito.StatusId
                                        where (p1Item.UserId = @uid or p2Item.UserId =@uid) and (s.Name = 'Closed' or s.Name='Accepted' or s.Name='Declined' or s.Name = 'Rescinded' )";
                    cmd.Parameters.AddWithValue("@uid", userId);

                    var offers = new List<ItemTradeOffer>();

                    using (var reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            offers.Add(new ItemTradeOffer()
                            {
                                Id = DbUtils.GetInt(reader, "offerId"),
                                Party1ItemId = DbUtils.GetInt(reader, "Party1ItemId"),
                                Party2ItemId = DbUtils.GetInt(reader, "Party2ItemId"),
                                StatusId = DbUtils.GetInt(reader, "StatusId"),
                                P1Item = new Item()
                                {
                                    Id = DbUtils.GetInt(reader, "Party1ItemId"),
                                    Name = DbUtils.GetString(reader, "p1ItemName"),
                                    ImageUrl = DbUtils.GetString(reader, "p1Img"),
                                    UserId = DbUtils.GetInt(reader, "p1User")
                                },
                                P2Item = new Item()
                                {
                                    Id = DbUtils.GetInt(reader, "Party2ItemId"),
                                    Name = DbUtils.GetString(reader, "p2ItemName"),
                                    ImageUrl = DbUtils.GetString(reader, "p2Img"),
                                    UserId = DbUtils.GetInt(reader, "p2User")
                                },
                                Status = new Status()
                                {
                                    Id = DbUtils.GetInt(reader, "StatusId"),
                                    Name = DbUtils.GetString(reader, "statusName")
                                }


                            });
                        }

                        return offers;

                    }
                }
            }
        }

        public void Update(ItemTradeOffer trade)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ItemTradeOffer
                           SET 
                               Party1ItemId= @p1ItemId,
                               Party2ItemId = @p2ItemId,
                               StatusId = @statusId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@p1ItemId", trade.Party1ItemId);
                    DbUtils.AddParameter(cmd, "@p2ItemId", trade.Party2ItemId);
                    DbUtils.AddParameter(cmd, "@statusId", trade.StatusId);
                    DbUtils.AddParameter(cmd, "@Id", trade.Id);
                    

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
