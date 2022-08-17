using Microsoft.AspNetCore.SignalR;
using TalkBack.Chat.Data.Models.Game;
using TalkBack.Chat.Data.Models.RestartGame;

namespace TalkBack.Chat.Data.Hubs.GameHub
{
    public class GameHub : Hub
    {
        public async Task SendMove(Game game)
        {
            await Clients.All.SendAsync("ReceiveMove", game);
        }
        public async Task StartGame(Game game)
        {
            await Clients.All.SendAsync("StartGame", game);
        }
        public async Task RestartGame(RestartGame game)
        {
            await Clients.All.SendAsync("RestartGame", game);
        }
        public async Task EndGame(RestartGame flag)
        {
            await Clients.All.SendAsync("Exit", flag);
        }
    }
}
