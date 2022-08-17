using Microsoft.AspNetCore.SignalR;
using TalkBack.Chat.Data.Models;

namespace TalkBack.Chat.Data.Hubs
{
    public class RequestHub : Hub
    {
        public async Task SendRequest(ChatRequest chatRequest)
        {
            await Clients.All.SendAsync("ChatRequest", chatRequest);
        }
        public async Task SendRequestAcknowledged(RequestAcknowledged request)
        {
            await Clients.All.SendAsync("ChatRequestAcknowledged", request);
        }
    }
}
