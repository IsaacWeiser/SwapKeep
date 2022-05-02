using Microsoft.Extensions.Configuration;
using SwapKeep.Models;
using SwapKeep.Repositories;
using SwapKeep.Utils;
using System;
using System.Collections.Generic;

namespace SwapKeep.Repositories
{
    public class StatusRepository : BaseRepository, IStatusRepository
    {
        public StatusRepository(IConfiguration config) : base(config) { }

        public String GetStatusById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Status WHERE Id =@id ";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return DbUtils.GetString(reader, "Name");
                        }

                        return null;
                    }

                }
            }
        }
    }
}
