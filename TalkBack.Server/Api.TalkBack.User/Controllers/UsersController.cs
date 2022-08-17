using Microsoft.AspNetCore.Mvc;
using TalkBackAccessControl.Data.Models;

namespace TalkBack.AccessControl.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;

        public UsersController(IUsersRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return _repo.GetAllUsers();
        }

        [HttpGet("{id:Guid}")]
        public async Task<ActionResult<User>> GetUserById(Guid id)
        {
            var user = await _repo.GetUserById(id);
            try
            {
                if (user == null)
                    return NotFound($"Id: '{id}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(user);
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<User>> GetUserByUserName(string userName)
        {
            var user = await _repo.GetUserByUserName(userName);
            try
            {
                if (user == null)
                    return BadRequest($"The user name '{userName}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(user);
        }


        [HttpPut("{id:Guid}")]
        public async Task<ActionResult<User>> UpdateUser(Guid id, [FromBody] UserDto user)
        {
            var _user = await _repo.UpdateUser(user, id);
            try
            {
                if (_user == null)
                {
                    return BadRequest();
                }
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok(_user);

        }

        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult<User>> DeleteUser(Guid id)
        {
            var _user = await _repo.DeleteUser(id);
            try
            {
                if (_user == null)
                    return NotFound($"Id: '{id}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(_user);
        }
    }
}