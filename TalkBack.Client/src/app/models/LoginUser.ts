import { User } from "./User";

export class LoginUser{
    user: User = new User;
    token: Token = new Token;
}

export class Token{
    token:string = "";
    expiration: string = ""
}