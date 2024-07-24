using GraphQL;
using GraphQL.Types;
using Time_Tracker.GraphQL.Schemas;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

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
