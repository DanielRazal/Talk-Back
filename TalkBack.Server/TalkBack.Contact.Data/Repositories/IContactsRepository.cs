using TalkBack.Contacts.Data.Models;

namespace TalkBack.Contacts.Data.Repositories
{
    public interface IContactsRepository
    {
        IQueryable<Contact> GetAllContacts();

        Task<Contact> GetContactById(Guid id);

        Task<Guid> AddContact(Contact user);

        Task<Contact> DeleteContact(Guid id);

        Task<bool> UpdateStatus(Guid userid, bool status);

        Task<Contact> GetContactByUserId(Guid userid);
    }
}
