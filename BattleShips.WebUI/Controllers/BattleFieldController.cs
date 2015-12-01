using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BattleShips.WebUI.Controllers
{
    public class BattleFieldController : Controller
    {
        // GET: BattleField
        public ActionResult Field()
        {
            ViewBag.FieldSize = 10;
            return View();
        }
    }
}