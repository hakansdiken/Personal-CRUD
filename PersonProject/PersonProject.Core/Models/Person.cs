using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace PersonProject.Models
{
    public class Person
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; } = null!;

        [BsonElement("surname")]
        public string Surname { get; set; } = null!;

        [BsonElement("mail")]
        public string Mail { get; set; } = null!;

        [BsonElement("createdDate")]
        public DateTime CreatedDate { get; set; }
    }
}
