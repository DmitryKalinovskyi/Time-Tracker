using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace Time_Tracker.Services;

public class HashingService
{
    public string ComputeHash(string password, string salt)
    {
        var decodedsalt = Convert.FromBase64String(salt);

        string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: decodedsalt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8));
        return hashed;
    }

    public string GenerateSalt()
    {
        byte[] salt = new byte[128 / 8];
        using (var rngCsp = new RNGCryptoServiceProvider())
        {
            rngCsp.GetNonZeroBytes(salt);
        }

        return Convert.ToBase64String(salt);
    }
}
