using Microsoft.AspNetCore.Mvc;
using TalkBack.Contacts.Data.Models;

namespace TalkBack.Contacts.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsRepository _repo;

        public ContactsController(IContactsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet()]
        public IEnumerable<Contact> GetAllContacts()
        {
            return _repo.GetAllContacts();
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<Contact>> GetContactById(Guid id)
        {
            var contact = await _repo.GetContactById(id);
            try
            {
                if (contact == null)
                    return NotFound($"Id: '{id}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(contact);
        }

        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<Contact>> DeleteContact(Guid id)
        {
            var contact = await _repo.DeleteContact(id);
            try
            {
                if (contact == null)
                    return NotFound($"Id: '{id}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> AddContact([FromBody] Contact contact)
        {
            await _repo.AddContact(contact);
            try
            {
                if (contact == null)
                    return BadRequest();
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(contact);
        }

        [HttpGet("updateStatus")]
        public async Task<ActionResult<bool>> UpdateStatus(Guid userid, bool status)
        {
            var result = await _repo.UpdateStatus(userid, status);
            return Ok(result);
        }

        [HttpGet("userid/{userid:guid}")]
        public async Task<ActionResult<Contact>> GetContactByUserId(Guid userid)
        {
            var contact = await _repo.GetContactByUserId(userid);
            try
            {
                if (contact == null)
                    return NotFound($"UserId: '{userid}' not exist");
            }
            catch (Exception)
            {
                return BadRequest();
            }
            return Ok(contact);
        }
    }
}