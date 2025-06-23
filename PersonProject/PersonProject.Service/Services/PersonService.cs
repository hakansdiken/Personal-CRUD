using PersonProject.Dtos;
using PersonProject.Models;
using PersonProject.Repositories;

namespace PersonalProject;

public class PersonService
{
    private readonly PersonRepository _personRepository;
    public PersonService(PersonRepository personRepository)
    {
        _personRepository = personRepository;
    }
    public async Task<List<PersonDto>> GetAllPersonsAsync()
    {
        var personList = await _personRepository.GetAllAsync();

        return personList.Select(p => new PersonDto
        {
            Id = p.Id,
            Name = p.Name,
            Surname = p.Surname,
            Mail = p.Mail,
            CreatedDate = p.CreatedDate
        }).ToList();
    }

    public async Task<PersonDto> GetPersonByIdAsync(string id)
    {
        var person = await _personRepository.GetByIdAsync(id) ??
            throw new ArgumentNullException($"Person ID {id} not found.");

        PersonDto personDto = new PersonDto
        {
            Id = person.Id,
            Name = person.Name,
            Surname = person.Surname,
            Mail = person.Mail,
            CreatedDate = person?.CreatedDate ?? DateTime.MinValue
        };

        return personDto;

    }
    public async Task CreatePersonAsync(CreatePersonDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto), "Person data cannot be null");

        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new ArgumentException("Person name cannot be null or empty", nameof(dto.Name));

        if (string.IsNullOrWhiteSpace(dto.Surname))
            throw new ArgumentException("Person surname cannot be null or empty", nameof(dto.Surname));

        if (string.IsNullOrWhiteSpace(dto.Mail))
            throw new ArgumentException("Person mail cannot be null or empty", nameof(dto.Mail));


        Person person = new Person
        {
            Name = dto.Name,
            Surname = dto.Surname,
            Mail = dto.Mail,
            CreatedDate = DateTime.UtcNow
        };

        await _personRepository.CreateAsync(person);
    }

    public async Task UpdatePersonAsync(UpdatePersonDto dto)
    {
        if (dto == null || string.IsNullOrEmpty(dto.Id))
            throw new ArgumentNullException(nameof(dto), "Person data cannot be null");
        else if (string.IsNullOrEmpty(dto.Surname))
            throw new ArgumentNullException(nameof(dto), "Person surname cannot be null");
        else if (string.IsNullOrEmpty(dto.Name))
            throw new ArgumentNullException(nameof(dto), "Person name cannot be null");
        else if (string.IsNullOrEmpty(dto.Mail))
            throw new ArgumentNullException(nameof(dto), "Person mail cannot be null");

        var exist = await _personRepository.GetByIdAsync(dto.Id);
        if (exist == null)
            throw new ArgumentNullException($"Person ID {dto.Id} not found.");

        Person person = new Person
        {
            Id = dto.Id,
            Name = dto.Name,
            Surname = dto.Surname,
            Mail = dto.Mail,
        };

        await _personRepository.UpdateAsync(person);
    }
    
    public async Task DeletePersonAsync(string id)
    {
        var exist = await _personRepository.GetByIdAsync(id);
        if (exist == null)
            throw new ArgumentNullException($"Person ID {id} not found.");
        await _personRepository.DeleteAsync(id);
    }

}
