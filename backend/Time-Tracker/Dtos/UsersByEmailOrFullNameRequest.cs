namespace Time_Tracker.Dtos
{
    public record class UsersByEmailOrFullNameRequest (string EmailOrFullName, int UsersLimit)
    {
    }
}
