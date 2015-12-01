using BattleShips.WebUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BattleShips.WebUI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult PlayerRating()
        {
            List<RatingDataModel> ratingData = new List<RatingDataModel>();
            ratingData.Add(new RatingDataModel()
            {
                UserName = "Pupkin",
                Score = 2300
            });
            ratingData.Add(new RatingDataModel()
            {
                UserName = "Bulkin",
                Score = 2220
            });
            ratingData.Add(new RatingDataModel()
            {
                UserName = "Zubkin",
                Score = 1500
            });
            ratingData.Add(new RatingDataModel()
            {
                UserName = "Nagibator",
                Score = 1000
            });
            return View(ratingData);
        }
        [HttpGet]
        public ActionResult Registration()
        {
            return View();
        }
    }
}