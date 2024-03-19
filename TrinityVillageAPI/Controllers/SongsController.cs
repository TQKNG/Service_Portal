using Microsoft.AspNetCore.Mvc;

namespace TrinityVillageAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class SongsController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<SongsController> _logger;

    public SongsController(ILogger<SongsController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetSongs")]
    public IEnumerable<Songs> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new Songs
        {
            Title = "Test Song"
           
        })
        .ToArray();
    }
    
   [HttpPost(Name = "TestHook")]
    public IActionResult ReceiveFormData([FromBody] dynamic formData)
    {
        // Process the received form data
        // Here, formData will contain the JSON payload sent by Typeform

        // Example: Log the received data
        Console.WriteLine("Received form data:");
        Console.WriteLine(formData);

        // Return an appropriate response
        return Ok();
    }
}
