using EnglishCenterManagement.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EnglishCenterManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        // change infomation
        // change pwd
        //

        //For admin Only
        //[HttpGet]
        //[Route("Admins")]
        //[Authorize(Roles = "Admin")]
        //public IActionResult AdminEndPoint()
        //{
        //    var currentUser = GetCurrentUser();
        //    return Ok($"Hi you are an {currentUser.Role}");
        //}
        //private UserModel GetCurrentUser()
        //{
        //    var identity = HttpContext.User.Identity as ClaimsIdentity;
        //    if (identity != null)
        //    {
        //        var userClaims = identity.Claims;
        //        return new UserModel
        //        {
        //            Username = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value,
        //            Role = userClaims.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value
        //        };
        //    }
        //    return null;
        //}
    }
}
