global using Microsoft.EntityFrameworkCore;
global using System.Text;
global using System.Text.Json.Serialization;
global using TalkBackAccessControl.Data.Context;
global using TalkBackAccessControl.Data.Repositories;
global using TalkBackAccessControl.Data.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TalkBackDbContext>(options =>
options.UseSqlServer(
builder.Configuration.GetConnectionString("TalkBackConnectionString")));

builder.Services.AddCors(setup =>
{
    setup.AddPolicy("CorsPolicy", options =>
    {
        options.AllowAnyMethod().AllowAnyHeader()
        .AllowAnyOrigin().WithOrigins(builder.Configuration["Jwt:Audience"]);
    });
});

builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<ILogin, Login>();


builder.Services.AddControllers().AddJsonOptions(options =>
options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var ctx = scope.ServiceProvider.GetRequiredService<TalkBackDbContext>();
    ctx.Database.EnsureDeleted();
    ctx.Database.EnsureCreated();
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
