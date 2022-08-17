using TalkBack.Chat.Data.Hubs;
using TalkBack.Chat.Data.Hubs.ChatHub;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSignalR();
builder.Services.AddCors(setup => setup.AddPolicy("CorsPolicy",
   options =>
   {
       options.AllowAnyMethod().AllowAnyHeader()
       .WithOrigins(builder.Configuration["Angular:LocalHost"])
       .AllowCredentials();
   }));


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

app.UseCors("CorsPolicy");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<ChatHub>("/chatsocket");
    endpoints.MapHub<RequestHub>("/request");
});

app.Run();
