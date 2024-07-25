namespace Time_Tracker.Services
{
    public interface IPasswordService
    {
        public bool IsMatch(string rawPassword, string hashedPassword);

        public string GetHashedPassword(string rawPassword);
    }
}
