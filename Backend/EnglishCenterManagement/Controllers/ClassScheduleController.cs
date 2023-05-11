using Microsoft.AspNetCore.Mvc;

namespace EnglishCenterManagement.Controllers
{
    public class ClassScheduleController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
