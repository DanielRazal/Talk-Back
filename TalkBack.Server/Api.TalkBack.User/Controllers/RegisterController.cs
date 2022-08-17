using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using TalkBackAccessControl.Data.Models;

namespace Api_TalkBack.AccessControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IUsersRepository _repo;

        public RegisterController(IUsersRepository repo)
        {
            _repo = repo;
        }
        [HttpPost("signUp")]
        public async Task<ActionResult<User>> SignUp(UserDto registerDto)
        {
            try
            {
                //If the user exists we cannot register
                if (await _repo.UserExists(registerDto.UserName!))
                {
                    return BadRequest("UserName Is Already Taken");
                }
            }
            catch (Exception)
            {
                return NotFound();
            }
            var hmac = new HMACSHA512();
            var user = new User
            {
                UserName = registerDto.UserName!.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password!)),
                PasswordSalt = hmac.Key,
            };
            //If all validations are valid create a new user
            await _repo.AddUser(user);

            return user;
        }
    }
}