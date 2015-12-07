using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BattleShips.Entities;

namespace BattleShips.WebUI.Controllers
{
    public class BattleFieldController : Controller
    {
        private static FakeStorageData data = new FakeStorageData();
        // GET: BattleField
        public ActionResult Field()
        {
            ViewBag.FieldSize = 10;
            return View();
        }
        [HttpPost]
        public ActionResult GetShipsPosition(string positions)
        {
            data.ShipsPosition = positions;
            return Json(new object());
        }
        [HttpPost]
        public ActionResult ResponseOnFire(int id)
        {
            return Json(new { cellValue = data.ShipsPosition[id] });
        }
    }
}