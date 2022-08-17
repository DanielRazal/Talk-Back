import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userEnvironment } from 'src/environments/environment';
import { LoginUser } from '../models/LoginUser';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
    
  private baseUrl = userEnvironment.baseApiUsersUrl;
  private usersUrl = userEnvironment.usersUrl;
  private login = userEnvironment.login;
  private register = userEnvironment.register;

  constructor(private http:HttpClient) { }


  GetAllUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl + this.usersUrl)
  }

  
  DeleteUser(id: string):Observable<User>{
    return this.http.delete<User>(this.baseUrl + this.usersUrl + '/' + id)
  }
  
  AddUser(user:User) :Observable<User>{
    let httpOptions = {
        headers: new HttpHeaders({'Content-Type':'application/json'})
      };
    return this.http.post<User>(this.baseUrl + this.register,user,httpOptions);
  }

  Login(user:User) :Observable<LoginUser>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post<LoginUser>(this.baseUrl + this.login,user,httpOptions)
  }

  UpdateUser(id:string,user:User):Observable<User>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.put<User>(this.baseUrl + this.usersUrl + '/' + id , user, httpOptions)
  }
  
  GetUserByName(userName:string):Observable<User>{
    return this.http.get<User>(this.baseUrl + this.usersUrl + '/' + userName);
  }

  GetUserById(id: string):Observable<User>{
    return this.http.get<User>(this.baseUrl + this.usersUrl + '/' + id)
  }
}