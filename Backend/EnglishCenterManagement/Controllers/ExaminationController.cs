using Microsoft.AspNetCore.Mvc;

namespace EnglishCenterManagement.Controllers
{
    public class ExaminationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
