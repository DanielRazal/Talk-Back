using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TalkBackAccessControl.Data.Models;

namespace TalkBackAccessControl.Data.Services
{
    public class Login : ILogin
    {
        public object JwtToken(User user, IConfiguration _config)
        {
            List<Claim> claims = new();
            Claim nameclaim = new(ClaimTypes.Name, user.UserName);
            claims.Add(nameclaim);
            Claim idClaim = new("UserId", user.Id.ToString());
            claims.Add(idClaim);

            var token = GetToken(claims, _config);
            var tokenobj = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                expiration = token.ValidTo
            };

            return new { user, token = tokenobj };
        }

        private static JwtSecurityToken GetToken(List<Claim> authClaims, IConfiguration config)
        {
            var key = config["Jwt:Key"];
            var issuer = config["Jwt:Issuer"];
            var audience = config["Jwt:Audience"];

            var authSigningKey = new SymmetricSecurityKey
                (Encoding.UTF8.GetBytes(key));

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials
                (authSigningKey, SecurityAlgorithms.HmacSha256)
             );

            return token;
        }

        //Calls the UpdateStatus method found in api of the contact by id of the user
        public async void UpdateStatus(User user, IConfiguration config)
        {

            string apiUrl = config["Contacts:UpdateStatus"];


            using HttpClient client = new();
            client.BaseAddress = new Uri(apiUrl);

            HttpResponseMessage response =
                await client.GetAsync(string.Format(apiUrl, user.Id.ToString(), true));
        }
    }
}