namespace TalkBack.Chat.Data.Models;

public class RequestAcknowledged
{
    public string? SenderId { get; set; }
    public string? ReceiverId { get; set; }
    public bool? Isaccept { get; set; }
}