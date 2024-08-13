using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Time_Tracker.Dtos;
using Time_Tracker.Helpers;

namespace Time_Tracker.Services;

public class TokenService
{
    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public TokenDto GenerateToken(int userId)
    {

        var key = SymmetricSecurityKeyHelper.GetSymmetricSecurityKey(_configuration["JWT:Key"]);
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
        };


        DateTime DateIssued = DateTime.UtcNow;
        DateTime DateExpires = DateIssued.AddMinutes(Convert.ToDouble(_configuration["Jwt:AccessTokenLifeTimeInMinutes"]));

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            notBefore: DateIssued,
            expires: DateExpires,
            signingCredentials: credentials
        );

        string value = new JwtSecurityTokenHandler().WriteToken(token);

        return new TokenDto(value, DateIssued, DateExpires);
    }

    public ClaimsPrincipal? GetTokenClaimsPrincipal(string accessToken)
    {
        var key = SymmetricSecurityKeyHelper.GetSymmetricSecurityKey(_configuration["JWT:Key"]);

        var validation = new TokenValidationParameters
        {
            IssuerSigningKey = key,
            ValidateLifetime = false,
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = _configuration["JWT:Issuer"],
            ValidAudience = _configuration["JWT:Audience"],
        };

        return new JwtSecurityTokenHandler().ValidateToken(accessToken, validation, out _);

    }
}
