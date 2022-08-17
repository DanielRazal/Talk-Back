using System.ComponentModel.DataAnnotations;

namespace TalkBack.Chat.Data.Models;

public class Message
{
    public string? SenderId { get; set; }
    public string? ReceiverId { get; set; }
    public string? User { get; set; }
    public string? MsgText { get; set; }

}

