using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace meetup_fullstack_core.Controllers
{
    public class HomeController : Controller
    {
        private readonly Feedbacks _feedbacks;

        public HomeController(Feedbacks feedbacks)
        {
            _feedbacks = feedbacks;
        }

        public IActionResult Index()
        {
            return View(_feedbacks.Todos());
        }
    }
}
