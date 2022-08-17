using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using TalkBackAccessControl.Data.Models;

namespace Api_TalkBack.AccessControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly ILogin _login;
        private readonly IConfiguration _config;

        public LoginController(IUsersRepository repo, ILogin login, IConfiguration config)
        {
            _repo = repo;
            _login = login;
            _config = config;
        }

        [HttpPost("login")]
        //Checks if the username and password match
        public async Task<ActionResult> Login(UserDto userLogin)
        {
            try
            {
                var user = await _repo.GetUserByUserName(userLogin.UserName);

                if (user == null) return Unauthorized("Invalid UserName");

                var hmac = new HMACSHA512(user.PasswordSalt!);

                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userLogin.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash![i])
                        return Unauthorized("Invalid Password");
                }

                _login.UpdateStatus(user,_config);

                return Ok(_login.JwtToken(user, _config));

            }
            catch (Exception)
            {
                return Unauthorized();
            }

        }
    }
}
