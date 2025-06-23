using MongoDB.Driver;
using Microsoft.Extensions.Options;
using PersonProject.Models;
using PersonProject.Data;

namespace PersonProject.Repositories
{
    public class PersonRepository
    {
        private readonly IMongoCollection<Person> _persons;
        public PersonRepository(IMongoClient client, IOptions<MongoDbSettings> mongoDbSettings)
        {
            var mongoDatabase = client.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _persons = mongoDatabase.GetCollection<Person>(mongoDbSettings.Value.CollectionName);
        }

        public async Task<List<Person>> GetAllAsync()
        {
            return await _persons.Find(p => true).ToListAsync(); 
        }
        public async Task<Person?> GetByIdAsync(string id)
        {
            return await _persons.Find(p => p.Id == id).FirstOrDefaultAsync(); 
        }
        public async Task CreateAsync(Person person)
        {
            await _persons.InsertOneAsync(person);
        }
        public async Task UpdateAsync(Person person)
        {
            await _persons.ReplaceOneAsync(p => p.Id == person.Id, person); 
        }
        public async Task DeleteAsync(string id)
        {
            await _persons.DeleteOneAsync(p => p.Id == id);     
        }
    }
}
