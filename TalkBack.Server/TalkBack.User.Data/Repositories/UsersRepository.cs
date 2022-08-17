using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using TalkBackAccessControl.Data.Context;
using TalkBackAccessControl.Data.Models;

namespace TalkBackAccessControl.Data.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly TalkBackDbContext _context;
        public UsersRepository(TalkBackDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> AddUser(User user)
        {
            user.Id = Guid.NewGuid();
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user.Id;
        }

        public async Task<User> DeleteUser(Guid id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user != null)
                _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user!;
        }

        public async Task<User> GetUserById(Guid id)
        {
            var user = await _context.Users.FindAsync(id)!;
            if (user != null)
                return user;
            else return null!;
        }


        public IQueryable<User> GetAllUsers()
        {
            return _context.Users;
        }

        public async Task<User> UpdateUser(UserDto user, Guid id)
        {
            var _user = await _context.Users.Where(x => x.Id == id).FirstOrDefaultAsync();
            var hmac = new HMACSHA512();

            if (_user != null)
            {
                _user.UserName = user.UserName;
                _user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password!));
                _user.PasswordSalt = hmac.Key;
                await _context.SaveChangesAsync();
            }

            return _user!;
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(x => x.UserName == username.ToLower());
        }

        public async Task<User> GetUserByUserName(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username)!;
            if (user != null)
                return user;
            else return null!;
        }
    }
}
