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

    public TokenDto GenerateAccessToken(int userId)
    {
        return GenerateTokenWithKey(userId, _configuration["Jwt:Key"]);
    }

    public TokenDto GenerateRefreshToken(int userId)
    {
        return GenerateTokenWithKey(userId, _configuration["Jwt:RefreshKey"]);
    }

    private TokenDto GenerateTokenWithKey(int userId, string KEY)
    {
        var key = SymmetricSecurityKeyHelper.GetSymmetricSecurityKey(KEY);
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

    public ClaimsPrincipal? GetRefreshTokenClaimsPrincipal(string refreshToken)
    {
        var key = SymmetricSecurityKeyHelper.GetSymmetricSecurityKey(_configuration["JWT:RefreshKey"]);

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

        return new JwtSecurityTokenHandler().ValidateToken(refreshToken, validation, out _);

    }
}
