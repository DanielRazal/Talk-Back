import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { contactEnvironment } from 'src/environments/environment';
import { Contact } from '../models/Contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = contactEnvironment.baseApiContactsUrl;
  private ContactsUrl = contactEnvironment.contactsUrl;
  private status = contactEnvironment.status;
  private updateStatusByUserId = contactEnvironment.updateStatusByUserId;

  
  constructor(private http:HttpClient) { }

  GetAllContacts():Observable<Contact[]>{
   return this.http.get<Contact[]>(this.baseUrl + this.ContactsUrl)
  }

  GetContactById(id: string):Observable<Contact>{
    return this.http.get<Contact>(this.baseUrl + this.ContactsUrl + '/' + id)
  }
  GetContactByUserId(userId: string):Observable<Contact>{
    return this.http.get<Contact>(this.baseUrl + this.ContactsUrl + '/userid/' + userId)
  }
  
  DeleteContact(id: string):Observable<Contact>{
    return this.http.delete<Contact>(this.baseUrl + this.ContactsUrl + '/' + id)
  }
  AddContact(contact:Contact) :Observable<Contact>{
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
    };
    return this.http.post<Contact>(this.baseUrl + this.ContactsUrl,contact,httpOptions);
  }

  UpdateStatus(userid:string,status:boolean):Observable<boolean>{
    return this.http.get<boolean>
    (this.baseUrl + this.ContactsUrl + this.updateStatusByUserId + userid + this.status + status)
  }

  GetLiveContact():Contact{
    let contactString = localStorage.getItem("contact");
    let contact = new Contact;
    if(contactString){
      contact = JSON.parse(contactString);
    }
    return contact;
  }
}
