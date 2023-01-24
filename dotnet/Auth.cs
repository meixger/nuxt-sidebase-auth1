public static class AuthExtensions
{
    public static void MapAuth(this WebApplication app)
    {
        app.MapPost("/auth/login", Auth.FindUser).WithName("Auth Login");
    }
}

public static class Auth
{
    public static LoginResponse? FindUser(LoginModel loginModel)
    {
        var user= Users.SingleOrDefault(_ => MatchUser(loginModel, _));
        return user == default
            ? null
            : new LoginResponse
              {
                  Id = user.id,
                  Name = user.name,
                  Email = user.email,
                  Role = user.role
              };
    }

    private static readonly (int id, string name, string email, string role, string username, string password)[] Users =
    {
        (22, "Foo Bar", "user.server@example.tld", "registered", "foo", "bar"),
        (99, "Admin", "admin.server@example.tld", "admin", "admin", "bar"),
    };

    private static bool MatchUser(LoginModel loginModel, (int id, string name, string email, string role, string username, string password) _)
        => string.Equals(loginModel.Username, _.username, StringComparison.OrdinalIgnoreCase) && loginModel.Password.Equals(_.password);
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class LoginResponse
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
}