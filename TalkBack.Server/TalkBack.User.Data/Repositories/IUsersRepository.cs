using TalkBackAccessControl.Data.Models;

namespace TalkBackAccessControl.Data.Repositories
{
    public interface IUsersRepository
    {
        Task<Guid> AddUser(User user);
        Task<bool> UserExists(string username);
        IQueryable<User> GetAllUsers();

        Task<User> GetUserById(Guid id);

        Task<User> GetUserByUserName(string username);

        Task<User> UpdateUser(UserDto user, Guid id);
        Task<User> DeleteUser(Guid id);

    }
}
