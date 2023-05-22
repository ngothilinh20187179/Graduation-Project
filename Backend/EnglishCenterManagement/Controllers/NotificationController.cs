using Microsoft.AspNetCore.Mvc;

namespace EnglishCenterManagement.Controllers
{
    public class NotificationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
