using Microsoft.AspNetCore.WebUtilities;

public static class WeatherExtensions
{
    public static void MapWeather(this WebApplication app)
    {

        app.MapGet("/weatherforecast", (HttpRequest req, int take) =>
        {
            var a = req.Headers.Authorization;
            if (a.ToString().StartsWith("Bearer "))
            {
                //var q = QueryString.FromUriComponent();
                var q = QueryHelpers.ParseQuery("?" + a.ToString().Substring(7));
                var isAdmin = q["role"] == "admin";
                var isRegistered = q["role"] == "registered";
                var sub = q["sub"];

                if (isAdmin)
                    return Results.Ok(GetWeatherForecast(take));
            }

            return Results.Json(new { message = $"Sorry, you are not authorized (admin required)" }, statusCode: 401);
            //return Results.Unauthorized();
        }).WithName("GetWeatherForecast");
    }

    static readonly string[] Summaries = {
                                             "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
                                         };

    static WeatherForecast[] GetWeatherForecast(int take)
    {
        var forecast = Enumerable.Range(1, take).Select(index =>
                                                         new WeatherForecast
                                                         (
                                                             DateTime.Now.AddDays(index),
                                                             Random.Shared.Next(-20, 55),
                                                             Summaries[Random.Shared.Next(Summaries.Length)]
                                                         ))
            .ToArray();
        return forecast;
    }
}

record WeatherForecast(DateTime Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}