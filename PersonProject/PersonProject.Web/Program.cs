using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PersonalProject;
using PersonProject.Data;
using PersonProject.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// mongodb ayarları options pattern ile yapıldı.
builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDbSettings"));


builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    return new MongoClient(settings.ConnectionString);
});

builder.Services.AddSingleton<PersonRepository>();
builder.Services.AddScoped<PersonService>();

builder.Services.AddCors(options => //Cross-Origin Resource Sharing
{
    options.AddPolicy("AllowAngularClient",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());   
});

var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
//     app.MapOpenApi();
// }
app.UseCors("AllowAngularClient");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
