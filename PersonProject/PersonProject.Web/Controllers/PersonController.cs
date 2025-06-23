using PersonProject.Dtos;
using Microsoft.AspNetCore.Mvc;
using PersonalProject;
using PersonProject.Models;

namespace PersonProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly PersonService _personService;
        public PersonController(PersonService personService)
        {
            _personService = personService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var persons = await _personService.GetAllPersonsAsync();

            return Ok(persons);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetById(string id)
        {
            var person = await _personService.GetPersonByIdAsync(id);

            return Ok(person);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePersonDto dto)
        {
            await _personService.CreatePersonAsync(dto);

            return Ok(dto);;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromBody] UpdatePersonDto dto)
        {
            await _personService.UpdatePersonAsync(dto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _personService.DeletePersonAsync(id);
            
            return NoContent();
        }
    }
}
