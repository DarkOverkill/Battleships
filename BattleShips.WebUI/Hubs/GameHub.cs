using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using BattleShips.Entities;

namespace BattleShips.WebUI.Hubs
{
    public class GameHub : Hub
    {
        static List<UserData> connectedUsers = new List<UserData>();

        public void Connect(string userName)
        {
            var id = Context.ConnectionId;
            if(connectedUsers.Count(x => x.Id == id) == 0)
            {
                connectedUsers.Add(new UserData { UserName = userName, Id = id });
                Clients.Caller.onConnected(id, userName, connectedUsers);

                Clients.AllExcept(id).onNewUserConnected(id, userName);
            }
        }

        public override System.Threading.Tasks.Task OnDisconnected(bool stop)
        {
            var item = connectedUsers.FirstOrDefault(x => x.Id == Context.ConnectionId);
            if(item != null)
            {
                connectedUsers.Remove(item);
                Clients.All.onUserDisconnected(item.Id);
            }
            return base.OnDisconnected(true);
        }

        public void GetShipsPosition(string position)
        {
            var user = connectedUsers.FirstOrDefault(x => x.Id == Context.ConnectionId);
            if (user != null)
            {
                user.ShipsPosition = position;
                int shipsCells = 0;
                for (int i = 0; i < position.Length; ++i)
                {
                    if (position[i] == '1')
                    {
                        shipsCells++;
                    }
                }
                user.ShipsCount = shipsCells;
            }
        }

        public void RequestOnGame(string toUserId)
        {
            string fromUserId = Context.ConnectionId;

            var toUser = connectedUsers.FirstOrDefault(x => x.Id == toUserId);
            var fromUser = connectedUsers.FirstOrDefault(x => x.Id == fromUserId);
            
            if(toUser != null && fromUser != null)
            {
                fromUser.OponentId = toUserId;
                Clients.Client(toUserId).requestOnGame(fromUserId, fromUser.UserName);
            }
        }

        public void AnswerOnRequest(string toUserId, string message)
        {
            string fromUserId = Context.ConnectionId;

            var toUser = connectedUsers.FirstOrDefault(x => x.Id == toUserId);
            var fromUser = connectedUsers.FirstOrDefault(x => x.Id == fromUserId);
            if (toUser != null && fromUser != null)
            {
                fromUser.OponentId = toUserId;
                Clients.Client(toUserId).answerOnRequest(fromUserId, fromUser.UserName, message);
            }
        }

    }
}