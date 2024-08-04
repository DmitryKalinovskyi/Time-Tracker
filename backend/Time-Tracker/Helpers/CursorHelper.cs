namespace Time_Tracker.Helpers
{
    public static class CursorHelper
    {
        public static string ToCursor(this int id)
        => Convert.ToBase64String(BitConverter.GetBytes(id));

        public static int? FromCursor(this string cursor)
        {
            if (string.IsNullOrEmpty(cursor))
                return null;

            var buffer = Convert.FromBase64String(cursor);
            return BitConverter.ToInt32(buffer, 0);
        }
    }
}
