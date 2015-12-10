using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BattleShips.Entities
{
    public class UserData
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string ShipsPosition { get; set; }
        public int ShipsCount { get; set; }
        public string OponentId { get; set; }
    }
}
