using GraphQL;
using GraphQL.Types;
using System.Security;
using Time_Tracker.GraphQL.Schemas;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSingleton<IRolesRepository, RolesRepository>();
builder.Services.AddSingleton<IUsersRepository, UsersRepository>();
builder.Services.AddSingleton<IPermissionsService, PermissionsService>();

// Configure GraphQL
builder.Services.AddGraphQL(b => b
    .AddSchema<RootSchema>()
    .AddSystemTextJson()
    .AddErrorInfoProvider(opt => opt.ExposeExceptionDetails = true)
    .AddGraphTypes(typeof(RootSchema).Assembly)
);

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors((policyBuilder) =>
{
    policyBuilder.AllowAnyHeader();
    policyBuilder.AllowAnyMethod();
    policyBuilder.AllowAnyOrigin();
});

// Add ui and middleware
app.UseGraphQLAltair();
app.UseGraphQL<ISchema>();

app.UseAuthorization();

app.MapControllers();

app.Run();
