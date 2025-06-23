namespace PersonProject.Dtos
{
    public class PersonDto
    {
        public string? Id { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Mail { get; set; } = null!;
        public DateTime CreatedDate { get; set; } 
    }
}
