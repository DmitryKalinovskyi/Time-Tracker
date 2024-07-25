namespace Time_Tracker.Services
{
    public class PasswordService : IPasswordService
    {
        public string GetHashedPassword(string rawPassword)
        {
            return rawPassword;
        }

        public bool IsMatch(string rawPassword, string hashedPassword)
        {
            return rawPassword == hashedPassword;
        }
    }
}
