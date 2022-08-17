using Microsoft.Extensions.Configuration;
using TalkBackAccessControl.Data.Models;

namespace TalkBackAccessControl.Data.Services
{
    public interface ILogin
    {
        void UpdateStatus(User user, IConfiguration _config);

        object JwtToken(User user, IConfiguration _config);
    }
}