using Microsoft.EntityFrameworkCore;
using TalkBack.Contacts.Data.Context;
using TalkBack.Contacts.Data.Models;

namespace TalkBack.Contacts.Data.Repositories
{
    public class ContactsRepository : IContactsRepository
    {
        private readonly TalkBackContactsDbContext _context;

        public ContactsRepository(TalkBackContactsDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> AddContact(Contact contact)
        {
            contact.Id = Guid.NewGuid();
            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact.Id;
        }

        public async Task<Contact> DeleteContact(Guid id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact != null)
                _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();
            return contact!;
        }

        public IQueryable<Contact> GetAllContacts()
        {
            return _context.Contacts.OrderBy(c => c.DisplayName);
        }

        public async Task<Contact> GetContactById(Guid id)
        {
            var contact = await _context.Contacts!.FindAsync(id)!;
            if (contact != null)
                return contact;
            else return null!;
        }

        public async Task<Contact> GetContactByUserId(Guid userid)
        {
            var contact = await _context.Contacts.FirstOrDefaultAsync(x => x.UserId == userid);
            if (contact != null)
                return contact!;
            else return null!;
        }

        //Searches by UserId and saves only the online users in DataBase
        public async Task<bool> UpdateStatus(Guid userid, bool status)
        {
            var _contact = await GetContactByUserId(userid);
            if (_contact != null)
            {
                _contact.Status = status;

                return await _context.SaveChangesAsync() > 0;
            }
            return false!;
        }
    }
}
