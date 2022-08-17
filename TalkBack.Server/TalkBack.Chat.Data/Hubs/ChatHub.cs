using Microsoft.AspNetCore.SignalR;
using TalkBack.Chat.Data.Models;

namespace TalkBack.Chat.Data.Hubs.ChatHub
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(Message message)
        {
            await Clients.All.SendAsync("ReceiveOne", message);
        }
    }
}
