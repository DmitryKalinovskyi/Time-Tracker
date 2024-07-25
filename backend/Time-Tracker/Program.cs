using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Time_Tracker.GraphQL.Schemas;
using Time_Tracker.Helpers;
using Time_Tracker.Repositories;
using Time_Tracker.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddSingleton<TokenService>();

// Configure authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer = builder.Configuration["JWT:Issuer"],
        ValidAudience = builder.Configuration["JWT:Audience"],
        IssuerSigningKey = SymmetricSecurityKeyHelper.GetSymmetricSecurityKey(builder.Configuration["JWT:Key"]),
        ClockSkew = TimeSpan.Zero,
        RoleClaimType = "authorities"
    };
});

builder.Services.AddSingleton<IRolesRepository, RolesRepository>();
builder.Services.AddSingleton<IUsersRepository, UsersRepository>();

builder.Services.AddSingleton<IPermissionsService, PermissionsService>();
builder.Services.AddSingleton<IPasswordService, PasswordService>();

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

app.UseAuthentication();
app.UseAuthorization();

// Add ui and middleware
app.UseGraphQLAltair();
app.UseGraphQL<ISchema>();

app.MapControllers();

app.Run();
