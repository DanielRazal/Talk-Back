namespace TalkBack.Chat.Data.Models.RestartGame
{
    public class RestartGame
    {
        public string? SenderId { get; set; }
        public string? ReceiverId { get; set; }
        public string? PlayerX { get; set; }
        public string? PlayerO { get; set; }
        public bool Accept { get; set; }
    }
}